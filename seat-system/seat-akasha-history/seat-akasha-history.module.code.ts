import { spawnSync } from "node:child_process"
import { loadedFrom } from "@akasha/pages-system/page-value"
import { underOldKeys } from "../seat-akasha-read/seat-akasha-read.module.code.ts"

// WHAT A SEAT STATED, READ BACK AFTER ITS PAGE IS GONE. A stop takes the page and commits the
// removal, so the last thing the seat said stands in that commit and nowhere else. This is what the
// old store's history was for; akasha's history is where it moved, and this reads it.
//
// A SEAT CANNOT RESTATE ITSELF FROM WHAT IT STATES. Everything a seat says about itself is read off
// its page, so a resume after a stop has nothing to read: it composes as unstated, no page is
// written, and what is observed of it has nowhere to land. The history is the only way back, and
// the old pages stopped carrying one when the write moved.
//
// AKASHA'S PAGE CARRIES WHAT THE OLD ONE DID NOT. The old page never held a start mode, which
// akasha requires, so a seat recovered from that history composed to nothing however complete the
// read was. Akasha's page states every value a page needs by definition, because a page short of
// one does not land.
//
// The values come back under the old page's key names, because every reader of this history asks
// by those and a seat recovered from either side must read alike.

const SEATS = "seat-system/seats/pages"

const SUFFIX = ".seat.ts"

const ID = "id"

const OUTPUT_CEILING = 64 * 1024 * 1024

export interface SeatInHistory {
  readonly commit: string
  readonly path: string
  readonly atMs: number
  readonly values: Record<string, unknown>
}

function gitAt(root: string, args: readonly string[]): string | null {
  const proc = spawnSync("git", [...args], {
    cwd: root,
    maxBuffer: OUTPUT_CEILING,
    stdio: ["ignore", "pipe", "ignore"],
  })
  if (proc.status !== 0) return null
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array())
}

// A body is loaded rather than parsed, because a page in akasha is code. It carries a type-only
// import of its page type, which is erased before the value is reached, so a body read out of a
// commit loads with nothing standing beside it.
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

// The newest commit that wrote each seat page, which is the last thing that page said, and when it
// said it. A removal is left out: what it holds is the absence, and the body before it is what the
// seat stated. The moment is the commit's, which is the newest a stopped seat can be read as active
// — nothing observes it after its page goes.
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

// The walk costs one git log and one read for each seat that has ever stood, so it is held for the
// life of the call rather than taken again for every question asked of it.
function seatsInHistory(root: string): ReadonlyMap<string, SeatInHistory> {
  const held = heldPerRoot.get(root)
  if (held !== undefined) return held
  const found = walkForSeats(root)
  heldPerRoot.set(root, found)
  return found
}

export function dropAkashaSeatsInHistory(): void {
  heldPerRoot.clear()
}

// EVERY SEAT AKASHA'S HISTORY HOLDS, each as the last thing its page said. A seat standing now is
// in here too, under the commit that last wrote it; a caller wanting only the stopped ones takes
// out the ones standing, which it can name and this cannot.
export function akashaSeatsInHistory(root: string): ReadonlyMap<string, SeatInHistory> {
  return seatsInHistory(root)
}

export function akashaSeatInHistory(agentId: string, root: string): SeatInHistory | null {
  if (agentId === "") return null
  return seatsInHistory(root).get(agentId) ?? null
}

export function akashaSeatNamedInHistory(seatName: string, root: string): SeatInHistory | null {
  if (seatName === "") return null
  const wanted = `${SEATS}/${seatName}${SUFFIX}`
  for (const held of seatsInHistory(root).values()) {
    if (held.path === wanted) return held
  }
  return null
}
