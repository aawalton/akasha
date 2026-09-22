import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameEntity } from "akasha/story/game/entity/game-entity.page-type.ts"
import {
  affinitiesIn,
  attributesIn,
  bondsIn,
  countIn,
  equipmentIn,
  joinedOf,
  markedIn,
  nowOf,
  saidIn,
  skillsIn,
} from "akasha/story/game/entity/modules/sheet-reading/sheet-reading.module.code.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import { oneDTwenty } from "akasha/story/game/mechanic/pages/one-d-twenty/one-d-twenty.game-mechanic.ts"
import { twoDTen } from "akasha/story/game/mechanic/pages/two-d-ten/two-d-ten.game-mechanic.ts"
import {
  type Composed,
  filedAt,
} from "akasha/story/game/modules/page-filing/page-filing.module.code.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"

const WRAPPERS = ["sheet", "floor-data"] as const
const PLURAL = "entities"
const NO_CLASS = "none"
const SOMETHING = "something"
const NOTES = ["notes", "hpNote", "classNote", "tierName", "designerNotes"]

const DICE = new Map([
  ["2d10", twoDTen.slug],
  ["1d20", oneDTwenty.slug],
])

const KEYS = [
  "title",
  "game",
  "kind",
  "class",
  "level",
  "attributes",
  "skills",
  "affinities",
  "traits",
  "titles",
  "equipment",
  "bonds",
  "dice",
  "baseDamage",
  "typicalIntent",
  "unspentAttributePoints",
  "revealGate",
  "note",
] as const

export function sheetIn(row: Record<string, unknown>): Record<string, unknown> {
  let held = row
  for (const key of WRAPPERS) {
    const one = row[key]
    if (isRecord(one)) held = { ...held, ...one }
  }
  return held
}

export function diceAt(held: unknown): string | undefined {
  const said = saidIn(held)?.toLowerCase()
  const slug = said === undefined ? undefined : DICE.get(said)
  return slug === undefined ? undefined : namedAs(gameMechanic.slug, slug, null)
}

export function classIn(held: unknown): string | undefined {
  const said = saidIn(held)
  return said === undefined || said.toLowerCase() === NO_CLASS ? undefined : said
}

export function slugFor(game: string, named: string): string {
  return `${game}-${named}`
}

export function someOf<Of>(found: readonly Of[]): readonly Of[] | undefined {
  return found.length === 0 ? undefined : found
}

export function entityFiled(where: Where, named: string, row: Record<string, unknown>): Composed {
  const held = sheetIn(row)
  return filedAt({
    root: where.root,
    folder: where.folder,
    pageTypeSlug: gameEntity.slug,
    plural: PLURAL,
    slug: slugFor(where.slug, named),
    keys: [...KEYS],
    values: {
      title: saidIn(held["name"]) ?? named,
      game: where.game,
      kind: (saidIn(held["kind"]) ?? SOMETHING).toLowerCase(),
      class: classIn(held["class"]),
      level: countIn(held["level"]),
      attributes: someOf(attributesIn(held["attributes"])),
      skills: someOf(skillsIn(held["skills"])),
      affinities: someOf(affinitiesIn(held["affinities"])),
      traits: someOf(markedIn(held["traits"])),
      titles: someOf(markedIn(held["titles"])),
      equipment: someOf(equipmentIn(held["equipment"])),
      bonds: someOf(bondsIn(held["bonds"], where.slug)),
      dice: diceAt(held["rollMode"]),
      baseDamage: countIn(held["baseDamage"]),
      typicalIntent: countIn(held["intentTypical"]),
      unspentAttributePoints: countIn(held["attributePointsUnspent"]),
      revealGate: countIn(held["revealGate"]),
      note: nowOf(joinedOf(held, NOTES)),
    },
  })
}
