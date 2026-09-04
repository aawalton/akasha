import { existsSync, openSync, unlinkSync } from "node:fs"
import { open } from "node:fs/promises"
import { exitCodeForThrowable } from "@akasha/errors-core/exit-code"
import {
  readEnvLocal,
  resolveEnvLocalPath,
  writeEnvLocalFromSops,
} from "@akasha/service-system/dev-server-env-writing"
import {
  type DevServerRecord,
  devServerTsvLine,
  recordFromState,
  stoppedRecord,
} from "@akasha/service-system/dev-server-recording"
import {
  APP_NAMES,
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
} from "@akasha/service-system/dev-server-stating"
import { resolveWorktreePath } from "@akasha/service-system/dev-server-worktree"
import { enforceMemoryGuard } from "@akasha/utils-system/memory-guard"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"

export const BOOTSTRAP = "bootstrap"

export const LOGS = "logs"

export const RESTART = "restart"

export const START = "start"

export const STATUS = "status"

export const STOP = "stop"

export const ACTS = [BOOTSTRAP, LOGS, RESTART, START, STATUS, STOP]

const SEQ = "--seq"

const APP = "--app"

const PORT = "--port"

const TAIL = "--tail"

const FORCE = "--force"

const ALL = "--all"

const JSON_LINE = "--json"

const VALUED = [SEQ, APP, PORT, TAIL]

const BARE = [FORCE, ALL, JSON_LINE]

const TAKEN: Record<string, readonly string[]> = {
  [BOOTSTRAP]: [SEQ, APP, FORCE, JSON_LINE],
  [LOGS]: [SEQ, APP, TAIL],
  [RESTART]: [SEQ, APP, PORT, JSON_LINE],
  [START]: [SEQ, APP, PORT, JSON_LINE],
  [STATUS]: [SEQ, APP, JSON_LINE],
  [STOP]: [SEQ, APP, ALL, JSON_LINE],
}

const TAIL_BY_DEFAULT = 100

const TERM_POLL_MS = 100

const TERM_TIMEOUT_MS = 5000

const EARLY_EXIT_MS = 200

const READ_CHUNK = 64 * 1024

const KIND = "dev-server"

const PORT_MARK = "<PORT>"

const NO_COOKIE_DOMAIN = "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"

export type Read =
  | {
      readonly act: string
      readonly seq: number | null
      readonly app: string | null
      readonly port: number | null
      readonly tail: number
      readonly force: boolean
      readonly all: boolean
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

function acts(): string {
  return ACTS.join("`, `")
}

function wholeIn(said: string): number | null {
  const held = Number(said)
  if (!Number.isInteger(held) || held < 0) return null
  return held
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  let force = false
  let all = false
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (VALUED.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`\`${one}\` names a value, and none followed it`)
        continue
      }
      said.set(one, value)
      continue
    }
    if (one === FORCE) {
      force = true
      continue
    }
    if (one === ALL) {
      all = true
      continue
    }
    if (one === JSON_LINE) {
      json = true
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${[...VALUED, ...BARE].join("`, `")}\``
      )
      continue
    }
    words.push(one)
  }
  const act = words[0]
  if (act === undefined) {
    return { refused: [...refusals, `this names no act — it carries \`${acts()}\``] }
  }
  const taken = TAKEN[act]
  if (taken === undefined) {
    return {
      refused: [...refusals, `\`${act}\` is no act this carries — it carries \`${acts()}\``],
    }
  }
  const rest = words.slice(1)
  if (rest.length > 1) {
    refusals.push(`\`${rest[1]}\` follows the seq, and one call names one act and one seq`)
  }
  const loose = rest[0]
  if (loose !== undefined) {
    if (said.has(SEQ)) {
      refusals.push(`\`${loose}\` stands where the seq goes, and \`${SEQ}\` already names one`)
    } else {
      said.set(SEQ, loose)
    }
  }
  for (const flag of [...VALUED, ...BARE]) {
    const named =
      flag === FORCE ? force : flag === ALL ? all : flag === JSON_LINE ? json : said.has(flag)
    if (named && !taken.includes(flag)) {
      refusals.push(`\`${act}\` does not take \`${flag}\` — it takes \`${taken.join("`, `")}\``)
    }
  }
  const seqSaid = said.get(SEQ)
  const seq = seqSaid === undefined ? null : wholeIn(seqSaid)
  if (seqSaid !== undefined && seq === null) {
    refusals.push(`\`${SEQ}\` names a whole number that is not negative, and \`${seqSaid}\` is not`)
  }
  const portSaid = said.get(PORT)
  const port = portSaid === undefined ? null : wholeIn(portSaid)
  if (portSaid !== undefined && port === null) {
    refusals.push(
      `\`${PORT}\` names a whole number that is not negative, and \`${portSaid}\` is not`
    )
  }
  const tailSaid = said.get(TAIL)
  const tail = tailSaid === undefined ? TAIL_BY_DEFAULT : wholeIn(tailSaid)
  if (tailSaid !== undefined && (tail === null || tail === 0)) {
    refusals.push(`\`${TAIL}\` names a whole number above nothing, and \`${tailSaid}\` is not`)
  }
  const app = said.get(APP) ?? null
  if (act === STOP) {
    if (all && (seq !== null || app !== null)) {
      refusals.push(
        `\`${STOP}\` reaches one server or every one of them, and \`${ALL}\` names both`
      )
    }
    if (!all && (seq === null || app === null)) {
      refusals.push(`\`${STOP}\` takes \`${ALL}\`, or both \`${SEQ}\` and \`${APP}\``)
    }
  } else if (act !== STATUS) {
    if (seq === null) refusals.push(`\`${act}\` names a seq, and none was said`)
    if (app === null) {
      refusals.push(`\`${act}\` names an app — it takes \`${APP_NAMES.join("`, `")}\``)
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act, seq, app, port, tail: tail ?? TAIL_BY_DEFAULT, force, all, json }
}

function errnoOf(thrown: unknown): string | undefined {
  if (thrown === null || typeof thrown !== "object" || !("code" in thrown)) return undefined
  const { code } = thrown
  return typeof code === "string" ? code : undefined
}

async function bootstrapping(read: {
  seq: number
  app: string
  force: boolean
  json: boolean
}): Promise<Answer> {
  const worktreePath = await resolveWorktreePath(read.seq)
  const envPath = await resolveEnvLocalPath(worktreePath, read.app)
  if (existsSync(envPath) && !read.force) {
    return refused(`${envPath} stands already — say \`${FORCE}\` to write over it`, 1)
  }
  const written = await writeEnvLocalFromSops({ worktreePath, appName: read.app })
  const report = read.json
    ? [JSON.stringify({ ok: true, path: written.path, var_count: written.varCount })]
    : [`wrote ${written.path} (${written.varCount} vars)`]
  return { report, refusals: [], code: 0 }
}

async function starting(read: {
  seq: number
  app: string
  port: number | null
  json: boolean
}): Promise<Answer> {
  const report: string[] = []
  const app = await lookupApp(read.app)
  const port = read.port ?? computePort({ basePort: app.basePort, seq: read.seq })

  const worktreePath = await resolveWorktreePath(read.seq)
  const cwd = `${worktreePath}/${app.packagePath}`
  if (!existsSync(cwd)) {
    return refused(
      `no app workspace stands at ${cwd} — check that \`${SEQ}\` and \`${APP}\` name what you meant`,
      1
    )
  }

  const envLocalPath = await resolveEnvLocalPath(worktreePath, read.app)
  if (!existsSync(envLocalPath) && existsSync(`${cwd}/deploy/secrets.sops.yaml`)) {
    const written = await writeEnvLocalFromSops({ worktreePath, appName: read.app })
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
  const cmd = [
    ...app.devCommand.map((one) => (one === PORT_MARK ? portSaid : one)),
    ...app.extraDevArgs,
  ]

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
      if (errnoOf(thrown) !== "ESRCH") throw thrown
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
        if (errnoOf(thrown) !== "ESRCH") throw thrown
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
    await lookupApp(app)
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
  seq: number | null
  app: string | null
  json: boolean
}): Promise<Answer> {
  const recorded = (state: DevServerState): DevServerRecord =>
    recordFromState(state, isPidAlive(state.pid))
  let records: readonly DevServerRecord[]
  if (read.seq !== null && read.app !== null) {
    await lookupApp(read.app)
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

export async function lastLinesOf(path: string, many: number): Promise<readonly string[]> {
  const handle = await open(path, "r")
  try {
    const stat = await handle.stat()
    let at = stat.size
    let held = ""
    let lines = 0
    while (at > 0 && lines <= many) {
      const chunk = Math.min(READ_CHUNK, at)
      at -= chunk
      const buffer = Buffer.alloc(chunk)
      await handle.read(buffer, 0, chunk, at)
      held = buffer.toString("utf8") + held
      lines = held.match(/\n/g)?.length ?? 0
    }
    const every = held.split("\n")
    const last = every.at(-1) === "" ? every.slice(0, -1) : every
    return last.length > many ? last.slice(last.length - many) : last
  } finally {
    await handle.close()
  }
}

async function tailing(read: { seq: number; app: string; tail: number }): Promise<Answer> {
  await lookupApp(read.app)
  const path = logFilePath(read.seq, read.app)
  if (!existsSync(path)) {
    return refused(`no log file stands at ${path} — has the server ever been started?`, 2)
  }
  return { report: await lastLinesOf(path, read.tail), refusals: [], code: 0 }
}

async function acting(read: Exclude<Read, { refused: readonly string[] }>): Promise<Answer> {
  if (read.act === STATUS) return await reading(read)
  if (read.act === STOP) return await stopping(read)
  const seq = read.seq ?? 0
  const app = read.app ?? ""
  if (read.act === BOOTSTRAP) {
    return await bootstrapping({ seq, app, force: read.force, json: read.json })
  }
  if (read.act === LOGS) return await tailing({ seq, app, tail: read.tail })
  if (read.act === START) {
    return await starting({ seq, app, port: read.port, json: read.json })
  }
  const stopped = await stopping({ seq, app, all: false, json: false })
  if (stopped.code !== 0) return stopped
  return await starting({ seq, app, port: read.port, json: read.json })
}

export async function devServer(argv: readonly string[], _given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await acting(read)
  } catch (thrown) {
    const carried = exitCodeForThrowable(thrown)
    return refused(whyOf(thrown), carried === 70 ? 3 : carried)
  }
}
