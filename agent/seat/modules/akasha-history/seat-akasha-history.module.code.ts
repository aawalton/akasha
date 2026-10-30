import { underOldKeys } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import { pagesAtFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const SEAT = "seat"

const SEATS_BEFORE = ["seat-system/seat/pages"]

const SUFFIX = ".seat.ts"

function foldersOf(root: string): readonly string[] {
  const now = pagesAtFor(root, SEAT)
  return SEATS_BEFORE.includes(now) ? SEATS_BEFORE : [now, ...SEATS_BEFORE]
}

const ID = "id"

interface SeatInHistory {
  readonly commit: string
  readonly path: string
  readonly atMs: number
  readonly values: Record<string, unknown>
}

function gitAt(root: string, args: readonly string[]): string | null {
  const done = ran(["git", ...args], { cwd: root })
  return done.code === 0 ? done.out : null
}

const UPDATED_AT = "updatedAt"

interface HeldValues {
  readonly atMs: number
  readonly values: Record<string, unknown>
}

function momentOf(page: Record<string, unknown>): number {
  const said = page[UPDATED_AT]
  const ms = typeof said === "string" ? Date.parse(said) : Number.NaN
  return Number.isFinite(ms) ? ms : 0
}

function valuesAt(root: string, commit: string, path: string): HeldValues | null {
  const text = gitAt(root, ["show", `${commit}:${path}`])
  if (text === null || text === "") return null
  const held = loadedFrom(text)
  if (held.failed !== null || held.value === null) return null
  const page = held.value as Record<string, unknown>
  return { atMs: momentOf(page), values: underOldKeys(page) }
}

function pathsAt(root: string, commit: string): readonly string[] {
  const found: string[] = []
  for (const folder of foldersOf(root)) {
    const listed = gitAt(root, ["ls-tree", "-r", "--name-only", commit, "--", folder])
    if (listed === null) continue
    for (const path of listed.split("\n")) if (path.endsWith(SUFFIX)) found.push(path)
  }
  return found
}

interface HeldReading {
  readonly onCommit: string
  readonly found: ReadonlyMap<string, SeatInHistory>
}

const heldPerRoot = new Map<string, HeldReading>()

function commitOn(root: string): string {
  return gitAt(root, ["rev-parse", "HEAD"])?.trim() ?? ""
}

function seatsAt(root: string, commit: string): ReadonlyMap<string, SeatInHistory> {
  const read: SeatInHistory[] = []
  for (const path of pathsAt(root, commit)) {
    const held = valuesAt(root, commit, path)
    if (held !== null) read.push({ commit, path, ...held })
  }
  const byId = new Map<string, SeatInHistory>()
  for (const seat of read.sort((one, two) => two.atMs - one.atMs)) {
    const id = seat.values[ID]
    if (typeof id !== "string" || id === "" || byId.has(id)) continue
    byId.set(id, seat)
  }
  return byId
}

function seatsInHistory(root: string): ReadonlyMap<string, SeatInHistory> {
  const onCommit = commitOn(root)
  const held = heldPerRoot.get(root)
  if (held !== undefined && held.onCommit === onCommit) return held.found
  const found = onCommit === "" ? new Map<string, SeatInHistory>() : seatsAt(root, onCommit)
  heldPerRoot.set(root, { onCommit, found })
  return found
}

export function akashaSeatsInHistory(root: string): ReadonlyMap<string, SeatInHistory> {
  return seatsInHistory(root)
}

export function akashaSeatInHistory(agentId: string, root: string): SeatInHistory | null {
  if (agentId === "") return null
  return seatsInHistory(root).get(agentId) ?? null
}

export function akashaSeatNamedInHistory(seatName: string, root: string): SeatInHistory | null {
  if (seatName === "") return null
  const wanted = `/${seatName}${SUFFIX}`
  let newest: SeatInHistory | null = null
  for (const held of seatsInHistory(root).values()) {
    if (!held.path.endsWith(wanted)) continue
    if (newest === null || held.atMs > newest.atMs) newest = held
  }
  return newest
}
