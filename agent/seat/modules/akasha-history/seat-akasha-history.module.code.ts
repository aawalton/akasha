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

export interface SeatInHistory {
  readonly commit: string
  readonly path: string
  readonly atMs: number
  readonly values: Record<string, unknown>
}

function gitAt(root: string, args: readonly string[]): string | null {
  const done = ran(["git", ...args], { cwd: root })
  return done.code === 0 ? done.out : null
}

function valuesAt(root: string, commit: string, path: string): Record<string, unknown> | null {
  const text = gitAt(root, ["show", `${commit}:${path}`])
  if (text === null || text === "") return null
  const held = loadedFrom(text)
  if (held.failed !== null || held.value === null) return null
  return underOldKeys(held.value as Record<string, unknown>)
}

interface Wrote {
  readonly commit: string
  readonly atMs: number
  readonly gone: boolean
}

const MARKED_OFF = "\t"

const TAKEN_AWAY = "D"

function newestPerPath(root: string): readonly (readonly [string, Wrote])[] {
  const log = gitAt(root, [
    "log",
    "--format=%H %ct",
    "--name-status",
    "--no-renames",
    "--",
    ...foldersOf(root),
  ])
  const found = new Map<string, Wrote>()
  if (log === null) return []
  let at = { commit: "", atMs: 0 }
  for (const line of log.split("\n")) {
    const said = line.trim()
    if (said === "") continue
    const marked = said.indexOf(MARKED_OFF)
    if (marked < 0) {
      const split = said.indexOf(" ")
      if (split <= 0) continue
      const seconds = Number.parseInt(said.slice(split + 1), 10)
      at = { commit: said.slice(0, split), atMs: Number.isFinite(seconds) ? seconds * 1000 : 0 }
      continue
    }
    const path = said.slice(marked + 1)
    if (!path.endsWith(SUFFIX) || found.has(path)) continue
    found.set(path, { ...at, gone: said.startsWith(TAKEN_AWAY) })
  }
  return [...found].sort((one, two) => two[1].atMs - one[1].atMs)
}

interface HeldReading {
  readonly onCommit: string
  readonly found: ReadonlyMap<string, SeatInHistory>
}

const heldPerRoot = new Map<string, HeldReading>()

function commitOn(root: string): string {
  return gitAt(root, ["rev-parse", "HEAD"])?.trim() ?? ""
}

function walkForSeats(root: string): ReadonlyMap<string, SeatInHistory> {
  const byId = new Map<string, SeatInHistory>()
  for (const [path, wrote] of newestPerPath(root)) {
    if (wrote.gone) continue
    const values = valuesAt(root, wrote.commit, path)
    if (values === null) continue
    const id = values[ID]
    if (typeof id !== "string" || id === "" || byId.has(id)) continue
    byId.set(id, { commit: wrote.commit, path, atMs: wrote.atMs, values })
  }
  return byId
}

function seatsInHistory(root: string): ReadonlyMap<string, SeatInHistory> {
  const onCommit = commitOn(root)
  const held = heldPerRoot.get(root)
  if (held !== undefined && held.onCommit === onCommit) return held.found
  const found = walkForSeats(root)
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
