import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { slugFor } from "akasha/story/game/entity/modules/entity-filing/entity-filing.module.code.ts"
import {
  countIn,
  joinedOf,
  listIn,
  saidIn,
} from "akasha/story/game/entity/modules/sheet-reading/sheet-reading.module.code.ts"
import {
  type Composed,
  type Filed,
  filedAt,
} from "akasha/story/game/modules/page-filing/page-filing.module.code.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import type { Placed } from "akasha/story/game/modules/world-filing/world-filing.module.code.ts"
import { gameTurn } from "akasha/story/game/turn/game-turn.page-type.ts"

const LOG = "log"
const TURN = "turn"
const WINDOW = "window"
const RANK = "rank"
const LEVEL = "level"
const DESCRIBED = "descriptors"
const INSIDE = ["award", "quest", "assessment", "activation", "choice"] as const
const NAMES = ["item", "skill", "affinity", "class", "title", "talent"] as const
const NOTES = ["objective", "prompt", "status", "note"] as const
const KEYS = ["game", "number", "windows"] as const
const WIDTH = 3
const ZERO = "0"
const JOIN = "; "
const MARK = ": "

export type Raised = {
  readonly kind: string
  readonly name?: string
  readonly rank?: string
  readonly level?: number
  readonly note?: string
}

function insideOf(held: Record<string, unknown>): Record<string, unknown> {
  for (const key of INSIDE) {
    const one = held[key]
    if (isRecord(one)) return one
  }
  return held
}

export function detailedIn(held: unknown): string | undefined {
  const found = listIn(held)
    .map((one) => {
      const value = saidIn(one["value"])
      if (value === undefined) return undefined
      const label = saidIn(one["label"])
      return label === undefined ? value : `${label}${MARK}${value}`
    })
    .filter((one) => one !== undefined)
  return found.length === 0 ? undefined : found.join(JOIN)
}

export function raisedIn(held: unknown): Raised | undefined {
  if (!isRecord(held)) return undefined
  const kind = saidIn(held["type"])
  if (kind === undefined) return undefined
  const inside = insideOf(held)
  return {
    kind: kind.toLowerCase(),
    name: joinedOf(inside, NAMES),
    rank: saidIn(held[RANK]) ?? saidIn(inside[RANK]),
    level: countIn(held[LEVEL]) ?? countIn(inside[LEVEL]),
    note: detailedIn(inside[DESCRIBED]) ?? joinedOf(inside, NOTES),
  }
}

export function raisedAt(row: Record<string, unknown>): ReadonlyMap<number, readonly Raised[]> {
  const found = new Map<number, Raised[]>()
  for (const beat of listIn(row[LOG])) {
    const at = countIn(beat[TURN])
    if (at === undefined) continue
    const held = found.get(at) ?? []
    const one = raisedIn(beat[WINDOW])
    if (one !== undefined) held.push(one)
    found.set(at, held)
  }
  const last = countIn(row[TURN])
  if (last !== undefined && !found.has(last)) found.set(last, [])
  return found
}

export function numberedAs(at: number): string {
  return `${at}`.padStart(WIDTH, ZERO)
}

export function turnFiled(where: Where, at: number, raised: readonly Raised[]): Composed {
  return filedAt({
    root: where.root,
    folder: where.folder,
    pageTypeSlug: gameTurn.slug,
    plural: gameTurn.pluralSlug,
    slug: slugFor(where.slug, numberedAs(at)),
    keys: [...KEYS],
    values: {
      game: where.game,
      number: at,
      windows: raised.length === 0 ? undefined : raised,
    },
  })
}

export function everyTurnFiled(where: Where, rows: readonly unknown[]): Placed {
  const last = rows.filter(isRecord).at(-1)
  if (last === undefined) return { answered: [] }
  const raised = raisedAt(last)
  const found: Filed[] = []
  for (const at of [...raised.keys()].sort((one, two) => one - two)) {
    const filed = turnFiled(where, at, raised.get(at) ?? [])
    if ("refused" in filed) return filed
    found.push(filed.answered)
  }
  return { answered: found }
}
