import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.ts"
import { gameEntity } from "akasha/story/game/entity/game-entity.page-type.ts"
import {
  entityFiled,
  slugFor,
  someOf,
} from "akasha/story/game/entity/modules/entity-filing/entity-filing.module.code.ts"
import {
  countIn,
  joinedOf,
  listIn,
  saidIn,
} from "akasha/story/game/entity/modules/sheet-reading/sheet-reading.module.code.ts"
import { gameLocation } from "akasha/story/game/location/game-location.page-type.ts"
import {
  type Composed,
  type Filed,
  filedAt,
} from "akasha/story/game/modules/page-filing/page-filing.module.code.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"

const LOCATIONS = "locations"
const ENCOUNTERS = "encounters"
const CONDITIONS = ["light", "water"] as const
const UNNAMED = "unnamed"
const NOTES = ["designerNotes"]
const DEPTH = "floor"

const LOCATION_KEYS = [
  "title",
  "game",
  "within",
  "depth",
  "theme",
  "description",
  "exits",
  "exhausted",
  "conditions",
  "things",
  "note",
] as const

const ENCOUNTER_KEYS = [
  "title",
  "game",
  "location",
  "entities",
  "readableTrait",
  "trigger",
  "experience",
  "drop",
  "note",
] as const

export type Placed = { readonly answered: readonly Filed[] } | { readonly refused: string }

export function conditionsIn(
  one: Record<string, unknown>
): readonly Record<string, unknown>[] | undefined {
  const found = CONDITIONS.map((name) => ({ name, note: saidIn(one[name]) })).filter(
    (held) => held.note !== undefined
  )
  return someOf(found)
}

export function exitsIn(one: Record<string, unknown>): readonly string[] | undefined {
  const said = Array.isArray(one["exits"]) ? one["exits"].map(saidIn) : []
  const found = [...said, saidIn(one["otherExits"])].filter((held) => held !== undefined)
  return someOf(found)
}

export function thingsIn(held: unknown): readonly Record<string, unknown>[] | undefined {
  const found = listIn(held).map((one) => ({
    name: saidIn(one["thing"]) ?? saidIn(one["name"]) ?? UNNAMED,
    use: saidIn(one["use"]),
    note: saidIn(one["note"]),
    status: saidIn(one["status"]),
  }))
  return someOf(found)
}

export function placeFiled(
  where: Where,
  named: string,
  within: string | undefined,
  depth: number | undefined,
  one: Record<string, unknown>
): Composed {
  return filedAt({
    root: where.root,
    folder: where.folder,
    pageTypeSlug: gameLocation.slug,
    plural: LOCATIONS,
    slug: slugFor(where.slug, named),
    keys: [...LOCATION_KEYS],
    values: {
      title: saidIn(one["name"]) ?? named,
      game: where.game,
      within,
      depth,
      theme: saidIn(one["theme"]),
      description: saidIn(one["desc"]),
      exits: exitsIn(one),
      exhausted: typeof one["exhausted"] === "boolean" ? one["exhausted"] : undefined,
      conditions: conditionsIn(one),
      things: thingsIn(one["searchables"]),
      note: joinedOf(one, NOTES),
    },
  })
}

export function metFiled(where: Where, at: string, one: Record<string, unknown>): Composed {
  const named = saidIn(one["id"]) ?? UNNAMED
  const reward = isRecord(one["reward"]) ? one["reward"] : {}
  const enemy = isRecord(one["enemy"]) ? one["enemy"] : {}
  return filedAt({
    root: where.root,
    folder: where.folder,
    pageTypeSlug: gameEncounter.slug,
    plural: ENCOUNTERS,
    slug: slugFor(where.slug, named),
    keys: [...ENCOUNTER_KEYS],
    values: {
      title: saidIn(enemy["name"]) ?? named,
      game: where.game,
      location: namedAs(gameLocation.slug, at, null),
      entities: [namedAs(gameEntity.slug, slugFor(where.slug, named), null)],
      readableTrait: saidIn(one["readableTrait"]),
      trigger: saidIn(one["trigger"]),
      experience: countIn(reward["xp"]),
      drop: saidIn(reward["drop"]),
      note: joinedOf(one, NOTES),
    },
  })
}

export function placesFiled(where: Where, row: Record<string, unknown>): Placed {
  const named = saidIn(row["external-id"]) ?? saidIn(row["externalId"]) ?? UNNAMED
  const at = slugFor(where.slug, named)
  const within = namedAs(gameLocation.slug, at, null)
  const depth = countIn(row[DEPTH])
  const every: Composed[] = [placeFiled(where, named, undefined, depth, row)]
  for (const room of listIn(row["rooms"])) {
    every.push(placeFiled(where, saidIn(room["id"]) ?? UNNAMED, within, depth, room))
  }
  for (const met of listIn(row["encounters"])) {
    every.push(metFiled(where, at, met))
    const enemy = isRecord(met["enemy"]) ? met["enemy"] : {}
    every.push(entityFiled(where, saidIn(met["id"]) ?? UNNAMED, enemy))
  }
  const found: Filed[] = []
  for (const one of every) {
    if ("refused" in one) return one
    found.push(one.answered)
  }
  return { answered: found }
}
