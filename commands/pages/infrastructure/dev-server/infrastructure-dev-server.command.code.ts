import { existsSync, openSync, unlinkSync } from "node:fs"
import { exitCodeForThrowable } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  APP,
  BOOTSTRAP,
  FORCE,
  LOGS,
  RESTART,
  type Read,
  readIn,
  SEQ,
  START,
  STATUS,
  STOP,
} from "akasha/commands/pages/infrastructure/dev-server/dev-server-argument-reading/dev-server-argument-reading.module.code.ts"
import { lastLinesOf } from "akasha/commands/pages/infrastructure/dev-server/last-lines/last-lines.module.code.ts"
import {
  readEnvLocal,
  resolveEnvLocalPath,
  writeEnvLocalFromPages,
} from "akasha/services/web-apps/dev-server-env-writing/dev-server-env-writing.module.code.ts"
import {
  type DevServerRecord,
  devServerTsvLine,
  recordFromState,
  stoppedRecord,
} from "akasha/services/web-apps/dev-server-recording/dev-server-recording.module.code.ts"
import {
  computePort,
  type DevServerState,
  ensureDevServerDirs,
  isPidAlive,
  listStateFiles,
  logFilePath,
  lookupApp,
  readStateFile,
  stateFilePath,
  writeStateFile,
} from "akasha/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"
import { resolveWorktreePath } from "akasha/services/web-apps/dev-server-worktree/dev-server-worktree.module.code.ts"
import { errnoCodeOf } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"
import { enforceMemoryGuard } from "akasha/utils/system/memory-guard/memory-guard.module.code.ts"

const TERM_POLL_MS = 100

const TERM_TIMEOUT_MS = 5000

const EARLY_EXIT_MS = 200

const KIND = "dev-server"

const PORT_MARK = "<PORT>"

const DEV_COMMAND: readonly string[] = ["bunx", "react-router", "dev", "--port", PORT_MARK]

const NO_COOKIE_DOMAIN = "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"

async function bootstrapping(read: {
  root: string
  seq: number
  app: string
  force: boolean
  json: boolean
}): Promise<Answer> {
  const worktreePath = await resolveWorktreePath(read.seq)
  const envPath = resolveEnvLocalPath(read.root, worktreePath, read.app)
  if (existsSync(envPath) && !read.force) {
    return refused(`${envPath} stands already — say \`${FORCE}\` to write over it`, 1)
  }
  const written = writeEnvLocalFromPages({
    root: read.root,
    worktreePath,
    appName: read.app,
  })
  const report = read.json
    ? [JSON.stringify({ ok: true, path: written.path, var_count: written.varCount })]
    : [`wrote ${written.path} (${written.varCount} vars)`]
  return { report, refusals: [], code: 0 }
}

async function starting(read: {
  root: string
  seq: number
  app: string
  port: number | null
  json: boolean
}): Promise<Answer> {
  const report: string[] = []
  const app = lookupApp(read.root, read.app)
  const port = read.port ?? computePort({ basePort: app.basePort, seq: read.seq })

  const worktreePath = await resolveWorktreePath(read.seq)
  const cwd = `${worktreePath}/${app.packagePath}`
  if (!existsSync(cwd)) {
    return refused(
      `no app workspace stands at ${cwd} — check that \`${SEQ}\` and \`${APP}\` name what you meant`,
      1
    )
  }

  const envLocalPath = resolveEnvLocalPath(read.root, worktreePath, read.app)
  if (!existsSync(envLocalPath)) {
    const written = writeEnvLocalFromPages({
      root: read.root,
      worktreePath,
      appName: read.app,
    })
    report.push(`auto-bootstrapped ${written.path} (${written.varCount} vars)`)
  }
  const envLocalVars = existsSync(envLocalPath) ? readEnvLocal(envLocalPath) : {}

  const standing = readStateFile(read.seq, read.app)
  if (standing !== null && isPidAlive(standing.pid)) {
    return refused(
      `a dev server is already running for seq=${read.seq} app=${read.app} ` +
        `(pid=${standing.pid}, port=${standing.port}) — a \`${RESTART}\` is how one is replaced`,
      3
    )
  }

  try {
    enforceMemoryGuard(KIND)
  } catch (thrown) {
    return refused(whyOf(thrown), 3)
  }

  ensureDevServerDirs(read.seq)
  const logPath = logFilePath(read.seq, read.app)
  const logFd = openSync(logPath, "a", 0o600)
  const portSaid = String(port)
  const cmd = DEV_COMMAND.map((one) => (one === PORT_MARK ? portSaid : one))

  const proc = Bun.spawn({
    cmd,
    cwd,
    stdin: "ignore",
    stdout: logFd,
    stderr: logFd,
    detached: true,
    env: { ...process.env, ...envLocalVars, [NO_COOKIE_DOMAIN]: "" },
  })
  if (typeof proc.unref === "function") proc.unref()

  const early = await Promise.race([
    proc.exited.then((code) => ({ exited: true as const, code })),
    new Promise<{ exited: false }>((settle) => {
      setTimeout(() => settle({ exited: false }), EARLY_EXIT_MS)
    }),
  ])
  if (early.exited) {
    return {
      report,
      refusals: [
        `the dev server exited straight away with code ${early.code} — ` +
          `port ${port} may be taken, and ${logPath} says what it wrote`,
      ],
      code: 3,
    }
  }

  const state: DevServerState = {
    pid: proc.pid,
    port,
    app: read.app,
    seq: read.seq,
    worktree_path: worktreePath,
    started_at: new Date().toISOString(),
    log_path: logPath,
  }
  writeStateFile(state)

  report.push(
    read.json
      ? JSON.stringify({ ok: true, pid: state.pid, port: state.port, log_path: state.log_path })
      : `pid=${state.pid} port=${state.port} log=${state.log_path}`
  )
  return { report, refusals: [], code: 0 }
}

type Stopped = {
  readonly seq: number
  readonly app: string
  readonly pid: number
  readonly was_running: boolean
}

async function stoppedOne(state: DevServerState): Promise<Stopped> {
  const { pid, seq, app } = state
  let wasRunning = false
  if (isPidAlive(pid)) {
    wasRunning = true
    try {
      process.kill(pid, "SIGTERM")
    } catch (thrown) {
      if (errnoCodeOf(thrown) !== "ESRCH") throw thrown
      wasRunning = false
    }
    const deadline = Date.now() + TERM_TIMEOUT_MS
    while (Date.now() < deadline && isPidAlive(pid)) {
      await new Promise((settle) => {
        setTimeout(settle, TERM_POLL_MS)
      })
    }
    if (isPidAlive(pid)) {
      try {
        process.kill(pid, "SIGKILL")
      } catch (thrown) {
        if (errnoCodeOf(thrown) !== "ESRCH") throw thrown
      }
    }
  }
  const path = stateFilePath(seq, app)
  if (existsSync(path)) unlinkSync(path)
  return { seq, app, pid, was_running: wasRunning }
}

function stopSaid(one: Stopped): string {
  return `stopped seq=${one.seq} app=${one.app} pid=${one.pid} (${one.was_running ? "was running" : "was stopped"})`
}

async function stopping(read: {
  root: string
  seq: number | null
  app: string | null
  all: boolean
  json: boolean
}): Promise<Answer> {
  let states: readonly DevServerState[]
  if (read.all) {
    states = listStateFiles()
  } else {
    const seq = read.seq ?? 0
    const app = read.app ?? ""
    lookupApp(read.root, app)
    const state = readStateFile(seq, app)
    if (state === null) {
      const said: Stopped = { seq, app, pid: 0, was_running: false }
      return {
        report: [read.json ? JSON.stringify({ stopped: [said] }) : stopSaid(said)],
        refusals: [],
        code: 0,
      }
    }
    states = [state]
  }
  const stopped: Stopped[] = []
  for (const state of states) stopped.push(await stoppedOne(state))
  if (read.json) {
    return { report: [JSON.stringify({ stopped })], refusals: [], code: 0 }
  }
  if (stopped.length === 0) {
    return { report: ["no dev server is tracked, so none was stopped"], refusals: [], code: 0 }
  }
  return { report: stopped.map(stopSaid), refusals: [], code: 0 }
}

async function reading(read: {
  root: string
  seq: number | null
  app: string | null
  json: boolean
}): Promise<Answer> {
  const recorded = (state: DevServerState): DevServerRecord =>
    recordFromState(state, isPidAlive(state.pid))
  let records: readonly DevServerRecord[]
  if (read.seq !== null && read.app !== null) {
    lookupApp(read.root, read.app)
    const state = readStateFile(read.seq, read.app)
    records = state === null ? [stoppedRecord(read.seq, read.app)] : [recorded(state)]
  } else if (read.seq === null && read.app === null) {
    records = listStateFiles().map(recorded)
  } else {
    records = listStateFiles()
      .map(recorded)
      .filter((one) => (read.seq !== null ? one.seq === read.seq : one.app === read.app))
  }
  if (read.json) return { report: [JSON.stringify(records)], refusals: [], code: 0 }
  return { report: records.map(devServerTsvLine), refusals: [], code: 0 }
}

async function tailing(read: {
  root: string
  seq: number
  app: string
  tail: number
}): Promise<Answer> {
  lookupApp(read.root, read.app)
  const path = logFilePath(read.seq, read.app)
  if (!existsSync(path)) {
    return refused(`no log file stands at ${path} — has the server ever been started?`, 2)
  }
  return { report: await lastLinesOf(path, read.tail), refusals: [], code: 0 }
}

async function acting(
  read: Exclude<Read, { refused: readonly string[] }>,
  root: string
): Promise<Answer> {
  if (read.act === STATUS) return await reading({ root, ...read })
  if (read.act === STOP) return await stopping({ root, ...read })
  const seq = read.seq ?? 0
  const app = read.app ?? ""
  if (read.act === BOOTSTRAP) {
    return await bootstrapping({ root, seq, app, force: read.force, json: read.json })
  }
  if (read.act === LOGS) return await tailing({ root, seq, app, tail: read.tail })
  if (read.act === START) {
    return await starting({ root, seq, app, port: read.port, json: read.json })
  }
  const stopped = await stopping({ root, seq, app, all: false, json: false })
  if (stopped.code !== 0) return stopped
  return await starting({ root, seq, app, port: read.port, json: read.json })
}

export async function infrastructureDevServer(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv, given.root)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await acting(read, given.root)
  } catch (thrown) {
    const carried = exitCodeForThrowable(thrown)
    return refused(whyOf(thrown), carried === 70 ? 3 : carried)
  }
}
