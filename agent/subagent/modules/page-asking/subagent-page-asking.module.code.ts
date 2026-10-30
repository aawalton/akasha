import { spawn } from "node:child_process"
import { appendFileSync, closeSync, existsSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  LOG_AT,
  supervisorsRootDir,
} from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import { seatAbove } from "akasha/agent/subagent/modules/naming/subagent-naming.module.code.ts"
import { subagentPageInHistory } from "akasha/agent/subagent/modules/page-history/subagent-page-history.module.code.ts"
import {
  pathIn,
  slugOf,
} from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { endingOf, ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  indexThere,
  listedAt,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const WRITING = "write"

const SEAT = "seat"

const MODULE = "module"

const PRESENCE = "subagent-presence"

const CODE = "code"

const TS = "ts"

const CALLED_AS = "subagent-presence"

const APART = "--apart"

const NOT_STARTED = "the program landing the page did not start"

export function logPathOf(seatId: string, baseDir?: string): string {
  return join(baseDir ?? supervisorsRootDir(), seatId, LOG_AT)
}

function padded(held: number, wide = 2): string {
  return String(held).padStart(wide, "0")
}

export function stampedAt(when: Date): string {
  const off = -when.getTimezoneOffset()
  const held = Math.abs(off)
  return (
    `${String(when.getFullYear())}-${padded(when.getMonth() + 1)}-${padded(when.getDate())}` +
    `T${padded(when.getHours())}:${padded(when.getMinutes())}:${padded(when.getSeconds())}` +
    `.${padded(when.getMilliseconds(), 3)}${off < 0 ? "-" : "+"}` +
    `${padded(Math.floor(held / 60))}:${padded(held % 60)}`
  )
}

export function lineFor(why: string): string {
  return `${CALLED_AS}: ${why}`
}

export function saidIn(seatId: string, why: string, baseDir?: string): undefined {
  const at = logPathOf(seatId, baseDir)
  try {
    mkdirSync(dirname(at), { recursive: true })
    appendFileSync(at, `${stampedAt(new Date())} ${lineFor(why)}\n`)
  } catch {}
  return undefined
}

export type Running = { readonly ended: () => boolean }

const ENDED: Running = { ended: () => true }

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch (thrown) {
    return (thrown as { readonly code?: unknown }).code === "EPERM"
  }
}

export function askingAt(
  program: string,
  root: string,
  seatId: string,
  args: readonly string[],
  baseDir?: string
): Running {
  const at = logPathOf(seatId, baseDir)
  const asked = args.join(" ")
  try {
    mkdirSync(dirname(at), { recursive: true })
    const handed = ran([process.execPath, import.meta.path, APART, at, program, root, ...args], {
      cwd: root,
    })
    const pid = Number(handed.out.trim())
    if (handed.code === 0 && Number.isInteger(pid) && pid > 0) {
      return { ended: () => !alive(pid) }
    }
    const why = handed.err.trim() || endingOf(handed.code, handed.signal)
    saidIn(seatId, `${asked} — ${NOT_STARTED}: ${why}`, baseDir)
  } catch (thrown) {
    saidIn(seatId, `${asked} — ${NOT_STARTED}: ${saidBy(thrown)}`, baseDir)
  }
  return ENDED
}

function startedApart(argv: readonly string[]): number {
  const at = argv[3]
  const program = argv[4]
  const root = argv[5]
  if (at === undefined || program === undefined || root === undefined) return 1
  let fd: number | null = null
  try {
    fd = openSync(at, "a")
  } catch {}
  try {
    const child = spawn(process.execPath, [program, root, ...argv.slice(6)], {
      cwd: root,
      detached: true,
      stdio: ["ignore", fd ?? "ignore", fd ?? "ignore"],
    })
    child.unref()
    if (child.pid === undefined) return 1
    process.stdout.write(`${String(child.pid)}\n`)
    return 0
  } finally {
    if (fd !== null) closeSync(fd)
  }
}

export function seatNamedIn(root: string, seatId: string): string | null {
  const listed = listedById(root, seatId)
  if (listed === null) return null
  const named = partedIn(listed.path)
  if (named === null || named.sections.length > 0 || named.pageType !== SEAT) return null
  return named.slug
}

export function presenceAt(root: string): string | null {
  if (!indexThere(root)) return null
  const page = listedAt(root, MODULE, PRESENCE)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${PRESENCE}\`, so no call would put a page up`)
  }
  return at
}

export type Asking = (root: string, seatId: string, args: readonly string[]) => undefined

function askingPresence(root: string, seatId: string, args: readonly string[]): undefined {
  const at = presenceAt(root)
  if (at !== null) askingAt(join(root, at), root, seatId, args)
  return undefined
}

export function askedBack(root: string, agentId: string, asking: Asking = askingPresence): boolean {
  const seatId = seatAbove(agentId)
  if (seatId === null) return false
  const own = agentId.slice(seatId.length + SUBAGENT_MARK.length)
  const seatName = seatNamedIn(root, seatId)
  if (own === "" || seatName === null) return false
  const at = pathIn(root, slugOf(seatName, own))
  if (existsSync(join(root, at))) return false
  if (subagentPageInHistory(root, at, agentId) === null) return false
  asking(root, seatId, [WRITING, seatName, own, "", seatId, String(Date.now())])
  return true
}

if (import.meta.main && Bun.argv[2] === APART) process.exit(startedApart(Bun.argv))
