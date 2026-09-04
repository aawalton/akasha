import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { FLEET } from "../compose-seat-name/compose-seat-name.module.code.ts"
import {
  akashaHolderProcessOf,
  akashaSeatIdForName,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import {
  akashaSeatsStated,
  akashaSeatValuesOf,
} from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { pageFromHistory } from "../seat-page-history/seat-page-history.module.code.ts"
import { statedProcessPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"

const MAX_ANCESTOR_GENERATIONS = 10

const PERSON_KEY = "person-slug"

const PRINCIPAL_KEY = "principal-seat-name"

const START_MODE_KEY = "start-mode"

const OPENED = "opened"

const SPAWNED = "spawned"

export interface ForestRow {
  readonly id: string
  readonly name: string | null
  readonly parent_agent_id: string | null
  readonly principal: string | null
  readonly launch: string | null
  readonly mode: string | null
  readonly live: boolean
}

function textAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

export interface SeatStanding {
  readonly name: string
  readonly frontmatter: Record<string, unknown>
  readonly live: boolean
}

export function forestRow(seat: SeatStanding): ForestRow {
  const person = textAt(seat.frontmatter, PERSON_KEY)
  const parentName = textAt(seat.frontmatter, PRINCIPAL_KEY)
  return {
    id: textAt(seat.frontmatter, "id") ?? "",
    name: seat.name,
    parent_agent_id: parentName === null ? null : parentIdOf(parentName),
    principal: person ?? (parentName === null ? null : FLEET),
    launch: person !== null ? OPENED : parentName !== null ? SPAWNED : null,
    mode: textAt(seat.frontmatter, START_MODE_KEY),
    live: seat.live,
  }
}

export function parentsToFetch(
  inHand: readonly SeatStanding[],
  attempted: ReadonlySet<string>
): readonly string[] {
  const held = new Set(inHand.map((seat) => seat.name))
  const named = inHand
    .map((seat) => textAt(seat.frontmatter, PRINCIPAL_KEY))
    .filter((name): name is string => name !== null && !held.has(name) && !attempted.has(name))
  return [...new Set(named)]
}

function parentIdOf(seatName: string): string | null {
  const seat = seatNamed(seatName)
  return seat === null ? null : (textAt(seat.frontmatter, "id") ?? null)
}

function fromAkasha(seatName: string): SeatStanding | null {
  const id = akashaSeatIdForName(seatName)
  if (id === null) return null
  const frontmatter = akashaSeatValuesOf(id)
  if (frontmatter === null) return null
  return {
    name: seatName,
    frontmatter,
    live: statedProcessPresence(akashaHolderProcessOf(id)) === "present",
  }
}

function seatNamed(seatName: string): SeatStanding | null {
  const inAkasha = fromAkasha(seatName)
  if (inAkasha !== null) return inAkasha
  const held = pageFromHistory(seatName, resolveRoots())
  return held === null ? null : { name: seatName, frontmatter: held.frontmatter, live: false }
}

function seatsStanding(): readonly SeatStanding[] {
  return akashaSeatsStated().map((one) => ({
    name: one.name,
    frontmatter: one.values,
    live: statedProcessPresence(akashaHolderProcessOf(one.id)) === "present",
  }))
}

export function readSeatForest(): readonly ForestRow[] {
  const byName = new Map<string, SeatStanding>()
  for (const seat of seatsStanding()) byName.set(seat.name, seat)
  const attempted = new Set<string>()
  for (let generation = 0; generation < MAX_ANCESTOR_GENERATIONS; generation += 1) {
    const wanted = parentsToFetch([...byName.values()], attempted)
    if (wanted.length === 0) break
    let found = 0
    for (const name of wanted) {
      attempted.add(name)
      const seat = seatNamed(name)
      if (seat === null) continue
      byName.set(name, { ...seat, live: false })
      found += 1
    }
    if (found === 0) break
  }
  return [...byName.values()].map(forestRow)
}
