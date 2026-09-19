import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import {
  actingOf,
  type Reading,
  type Stray,
  strayNow,
} from "akasha/agent/modules/stray-process/stray-process.module.code.ts"
import { ending } from "akasha/code/process/modules/process-ending/process-ending.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

const SECOND = 1000

const MINUTE = 60

const HOUR = 3600

const TICKS_A_SECOND = 100

const UNSAID = "?"

const ALL_READ = "every subagent a live process names was read"

export type Times = { readonly ranMs: number; readonly burnedMs: number }

export type TimesOf = (pid: number) => Times | null

export function clockSaid(ms: number): string {
  const whole = Math.max(0, Math.floor(ms / SECOND))
  const hours = String(Math.floor(whole / HOUR))
  const minutes = String(Math.floor(whole / MINUTE) % MINUTE).padStart(2, "0")
  const seconds = String(whole % MINUTE).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export function burnedTicksIn(stat: string): number | null {
  const close = stat.lastIndexOf(")")
  if (close === -1) return null
  const rest = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const own = Number(rest[11])
  const kernel = Number(rest[12])
  if (!Number.isFinite(own) || !Number.isFinite(kernel)) return null
  return own + kernel
}

export function timesOf(pid: number): Times | null {
  try {
    const at = `/proc/${String(pid)}`
    const ticks = burnedTicksIn(readFileSync(`${at}/stat`).toString("utf8"))
    if (ticks === null) return null
    return { ranMs: Date.now() - statSync(at).mtimeMs, burnedMs: (ticks / TICKS_A_SECOND) * SECOND }
  } catch {
    return null
  }
}

export function lineOf(one: Stray, times: TimesOf): string {
  const held = times(one.pid)
  const ran = held === null ? UNSAID : clockSaid(held.ranMs)
  const burned = held === null ? UNSAID : clockSaid(held.burnedMs)
  return `${String(one.pid)}  ${one.actingAgentId}  ran ${ran}  burned ${burned}  ${one.cmdline}`
}

export function unreadSaid(unread: readonly string[]): string {
  if (unread.length === 0) return ALL_READ
  return `${String(unread.length)} subagent(s) could not be read: ${unread.join(", ")}`
}

function kinBy(
  entries: readonly ProcLivenessEntry[]
): ReadonlyMap<number, readonly ProcLivenessEntry[]> {
  const held = new Map<number, ProcLivenessEntry[]>()
  for (const one of entries) {
    if (one.ppid === undefined) continue
    const born = held.get(one.ppid)
    if (born === undefined) held.set(one.ppid, [one])
    else born.push(one)
  }
  return held
}

export function withDescendants(
  strays: readonly Stray[],
  entries: readonly ProcLivenessEntry[]
): readonly Stray[] {
  const kin = kinBy(entries)
  const taken = new Set(strays.map((one) => one.pid))
  const whole: Stray[] = [...strays]
  for (let at = 0; at < whole.length; at += 1) {
    const one = whole[at]
    if (one === undefined) continue
    for (const born of kin.get(one.pid) ?? []) {
      if (taken.has(born.pid)) continue
      if (actingOf(born) !== null) continue
      taken.add(born.pid)
      whole.push({ pid: born.pid, actingAgentId: one.actingAgentId, cmdline: born.cmdline })
    }
  }
  return whole
}

export type Swept = {
  readonly ended: readonly Stray[]
  readonly said: readonly string[]
  readonly unread: readonly string[]
}

export type Scanning = () => readonly ProcLivenessEntry[]

export type Asking = (entries: readonly ProcLivenessEntry[]) => Promise<Reading>

export type Ending = (pids: readonly number[]) => Promise<unknown>

const scanningHere: Scanning = () => scanProcEntries().entries

const askingHere: Asking = (entries) => strayNow(entries)

const endingHere: Ending = (pids) => ending(pids)

export async function sweptOnce(
  scanning: Scanning = scanningHere,
  asking: Asking = askingHere,
  times: TimesOf = timesOf,
  end: Ending = endingHere
): Promise<Swept> {
  const entries = scanning()
  const read = await asking(entries)
  const ended = withDescendants(read.strays, entries)
  const said = ended.map((one) => lineOf(one, times))
  if (ended.length > 0) await end(ended.map((one) => one.pid))
  return { ended, said, unread: read.unread }
}

const KEPT_AT = ".local/state/workstation-services/stray-sweep-unread.json"

const NONE: readonly string[] = []

export function keptAt(home: string): string {
  return join(home, KEPT_AT)
}

export function homeAt(): string | null {
  return optionalEnv("HOME") ?? null
}

export function unreadIn(held: unknown): readonly string[] {
  if (!Array.isArray(held)) return NONE
  return held.filter((one): one is string => typeof one === "string").sort()
}

export function keptRead(home: string | null): readonly string[] {
  if (home === null) return NONE
  const at = keptAt(home)
  if (!existsSync(at)) return NONE
  try {
    return unreadIn(JSON.parse(readFileSync(at, "utf8")))
  } catch {
    return NONE
  }
}

export function keptWrite(unread: readonly string[], home: string | null): undefined {
  if (home === null) return
  const at = keptAt(home)
  try {
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, `${JSON.stringify([...unread].sort(), null, 2)}\n`)
  } catch {
    return
  }
}

export function sameUnread(was: readonly string[], now: readonly string[]): boolean {
  const one = [...was].sort()
  const two = [...now].sort()
  return one.length === two.length && one.every((said, at) => said === two[at])
}

export function saidOf(swept: Swept, was: readonly string[] = NONE): readonly string[] {
  if (sameUnread(was, swept.unread)) return swept.said
  return [...swept.said, unreadSaid(swept.unread)]
}

export type Kept = () => readonly string[]

export type Keeping = (unread: readonly string[]) => undefined

const keptHere: Kept = () => keptRead(homeAt())

const keepingHere: Keeping = (unread) => keptWrite(unread, homeAt())

const LOG = "sweep-stray-processes:"

function logged(line: string): undefined {
  console.log(`${LOG} ${line}`)
  return undefined
}

export async function sweepStrayProcesses(
  say: (line: string) => undefined = logged,
  kept: Kept = keptHere,
  keeping: Keeping = keepingHere
): Promise<void> {
  const swept = await sweptOnce()
  for (const line of saidOf(swept, kept())) say(line)
  keeping(swept.unread)
}
