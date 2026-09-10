import { loadedFrom } from "@akasha/pages/page-value"
import { ran } from "@akasha/utils/run/running"
import { underOldKeys } from "../seat-akasha-read/seat-akasha-read.module.code.ts"

const SEATS = "seat-system/seats/pages"

const SUFFIX = ".seat.ts"

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
}

function newestPerPath(root: string): ReadonlyMap<string, Wrote> {
  const log = gitAt(root, [
    "log",
    "--diff-filter=AM",
    "--format=%H %ct",
    "--name-only",
    "--",
    SEATS,
  ])
  const found = new Map<string, Wrote>()
  if (log === null) return found
  let wrote: Wrote = { commit: "", atMs: 0 }
  for (const line of log.split("\n")) {
    const said = line.trim()
    if (said === "") continue
    const split = said.indexOf(" ")
    if (split > 0) {
      const seconds = Number.parseInt(said.slice(split + 1), 10)
      wrote = {
        commit: said.slice(0, split),
        atMs: Number.isFinite(seconds) ? seconds * 1000 : 0,
      }
      continue
    }
    if (!said.startsWith(`${SEATS}/`) || !said.endsWith(SUFFIX)) continue
    if (!found.has(said)) found.set(said, wrote)
  }
  return found
}

const heldPerRoot = new Map<string, ReadonlyMap<string, SeatInHistory>>()

function walkForSeats(root: string): ReadonlyMap<string, SeatInHistory> {
  const byId = new Map<string, SeatInHistory>()
  for (const [path, wrote] of newestPerPath(root)) {
    const values = valuesAt(root, wrote.commit, path)
    if (values === null) continue
    const id = values[ID]
    if (typeof id !== "string" || id === "" || byId.has(id)) continue
    byId.set(id, { commit: wrote.commit, path, atMs: wrote.atMs, values })
  }
  return byId
}

function seatsInHistory(root: string): ReadonlyMap<string, SeatInHistory> {
  const held = heldPerRoot.get(root)
  if (held !== undefined) return held
  const found = walkForSeats(root)
  heldPerRoot.set(root, found)
  return found
}

export function dropAkashaSeatsInHistory(): undefined {
  heldPerRoot.clear()
  return undefined
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
  const wanted = `${SEATS}/${seatName}/${seatName}${SUFFIX}`
  for (const held of seatsInHistory(root).values()) {
    if (held.path === wanted) return held
  }
  return null
}
