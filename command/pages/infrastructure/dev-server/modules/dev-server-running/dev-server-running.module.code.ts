import { existsSync, openSync, unlinkSync } from "node:fs"
import { errnoCodeOf } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"
import { commit as commitArgument } from "akasha/command/argument/pages/commit.argument.ts"
import { webApp } from "akasha/command/argument/pages/web-app.argument.ts"
import {
  answeredWith,
  asJson,
  INPUT,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { enforceMemoryGuard } from "akasha/infrastructure/kernel/modules/memory-guard/memory-guard.module.code.ts"
import {
  readEnvLocal,
  resolveEnvLocalPath,
  writeEnvLocalFromPages,
  wroteEnvSaid,
} from "akasha/infrastructure/service/web-app/modules/dev-server-env-writing/dev-server-env-writing.module.code.ts"
import {
  type DevServerState,
  ensureDevServerDirs,
  freePortFrom,
  isPidAlive,
  listStateFiles,
  logFilePath,
  lookupApp,
  readStateFile,
  stateFilePath,
  statesFor,
  writeStateFile,
} from "akasha/infrastructure/service/web-app/modules/dev-server-stating/dev-server-stating.module.code.ts"
import {
  treeLaidDown,
  treeTakenAway,
} from "akasha/infrastructure/service/web-app/modules/dev-server-tree/dev-server-tree.module.code.ts"

const TERM_POLL_MS = 100

const TERM_TIMEOUT_MS = 5000

const EARLY_EXIT_MS = 200

const KIND = "dev-server"

const PORT_MARK = "<PORT>"

const DEV_COMMAND: readonly string[] = ["bunx", "react-router", "dev", "--port", PORT_MARK]

const NO_COOKIE_DOMAIN = "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"

const REPLACED_BY = "akasha infrastructure dev-server restart"

export async function starting(
  read: {
    root: string
    commit: string
    app: string
    port: number | null
    json: boolean
  },
  done: string[] = []
): Promise<Answer> {
  const report: string[] = []
  const app = lookupApp(read.root, read.app)

  const already = readStateFile(read.commit, read.app)
  if (already !== null && isPidAlive(already.pid)) {
    return refused(
      `a dev server is already running for commit=${read.commit.slice(0, 12)} app=${read.app} ` +
        `(pid=${already.pid}, port=${already.port}) — \`${REPLACED_BY}\` is how one is replaced`,
      OPERATIONAL
    )
  }

  const treePath = treeLaidDown(read.root, read.commit)
  const cwd = `${treePath}/${app.packagePath}`
  if (!existsSync(cwd)) {
    return refused(
      `no app workspace is at ${cwd} — check that \`${commitArgument.said}\` and \`${webApp.said}\` name what you meant`,
      INPUT
    )
  }

  const envLocalPath = resolveEnvLocalPath(read.root, treePath, read.app)
  if (!existsSync(envLocalPath)) {
    const written = writeEnvLocalFromPages({
      root: read.root,
      worktreePath: treePath,
      appName: read.app,
    })
    report.push(`auto-bootstrapped ${written.path} (${written.varCount} vars)`)
    done.push(wroteEnvSaid(written.path, written.varCount))
  }
  const envLocalVars = existsSync(envLocalPath) ? readEnvLocal(envLocalPath) : {}

  enforceMemoryGuard(KIND)

  const port = read.port ?? freePortFrom(app.basePort)
  ensureDevServerDirs(read.commit)
  const logPath = logFilePath(read.commit, read.app)
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
    return answeredWith(
      report,
      [
        `the dev server exited straight away with code ${early.code} — ` +
          `port ${port} may be taken, and ${logPath} says what it wrote`,
      ],
      OPERATIONAL
    )
  }
  done.push(`left a dev server running at pid ${String(proc.pid)} on port ${portSaid}`)

  const state: DevServerState = {
    pid: proc.pid,
    port,
    app: read.app,
    commit: read.commit,
    tree_path: treePath,
    started_at: new Date().toISOString(),
    log_path: logPath,
  }
  writeStateFile(state)
  done.push(`wrote the state file for commit=${read.commit.slice(0, 12)} app=${read.app}`)

  report.push(
    read.json
      ? JSON.stringify({ ok: true, pid: state.pid, port: state.port, log_path: state.log_path })
      : `pid=${state.pid} port=${state.port} log=${state.log_path}`
  )
  return told(report)
}

type Stopped = {
  readonly commit: string
  readonly app: string
  readonly pid: number
  readonly was_running: boolean
}

async function stoppedOne(state: DevServerState, done: string[]): Promise<Stopped> {
  const { pid, commit, app } = state
  let wasRunning = false
  if (isPidAlive(pid)) {
    wasRunning = true
    try {
      process.kill(pid, "SIGTERM")
      done.push(`signalled commit=${commit.slice(0, 12)} app=${app} pid=${String(pid)}`)
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
  const path = stateFilePath(commit, app)
  if (existsSync(path)) {
    unlinkSync(path)
    done.push(`took ${path}`)
  }
  if (statesFor(commit).length === 0) {
    treeTakenAway(commit)
    done.push(`took the tree of ${commit.slice(0, 12)}`)
  }
  return { commit, app, pid, was_running: wasRunning }
}

function stopSaid(one: Stopped): string {
  return `stopped commit=${one.commit.slice(0, 12)} app=${one.app} pid=${one.pid} (${one.was_running ? "was running" : "was stopped"})`
}

export async function stopping(
  read: {
    root: string
    commit: string | null
    app: string | null
    all: boolean
    json: boolean
  },
  done: string[] = []
): Promise<Answer> {
  let states: readonly DevServerState[]
  if (read.all) {
    states = listStateFiles()
  } else {
    const commit = read.commit ?? ""
    const app = read.app ?? ""
    lookupApp(read.root, app)
    const state = readStateFile(commit, app)
    if (state === null) {
      const said: Stopped = { commit, app, pid: 0, was_running: false }
      return read.json ? asJson({ stopped: [said] }) : told([stopSaid(said)])
    }
    states = [state]
  }
  const stopped: Stopped[] = []
  for (const state of states) stopped.push(await stoppedOne(state, done))
  if (read.json) return asJson({ stopped })
  if (stopped.length === 0) return told(["no dev server is tracked, so none was stopped"])
  return told(stopped.map(stopSaid))
}
