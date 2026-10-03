"use client"

import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type {
  Asked,
  QueryRow,
} from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"

import type { Quest } from "akasha/story/engine/core/modules/quest-schema/quest-schema.module.code.ts"
import type { RevealedSheet } from "akasha/story/engine/core/modules/revealed/revealed.module.code.ts"
import type { GameState } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { worldAttunement } from "akasha/story/world/mechanics/attunements/world-attunement.page-type.ts"
import { worldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.ts"
import { worldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.ts"
import {
  type Had,
  itemsOf,
} from "akasha/story/world/mechanics/items/story-item/modules/character-items-beside/character-items-beside.module.code.ts"
import { worldLegacy } from "akasha/story/world/mechanics/legacies/world-legacy.page-type.ts"
import { metricCharacterAttribute } from "akasha/story/world/mechanics/metrics/metric-character/attribute/metric-character-attribute.page-type.ts"

import { metricCharacterResource } from "akasha/story/world/mechanics/metrics/metric-character/resource/metric-character-resource.page-type.ts"
import { worldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.ts"
import { worldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.ts"
import { worldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { worldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.ts"
import { characterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import { poolsIn } from "akasha/story/world/stories/played/modules/played-pools/played-pools.module.code.ts"
import { readPurses } from "akasha/story/world/stories/played/modules/played-purses/played-purses.module.code.ts"
import {
  attunementsIn,
  bondsIn,
  type Counted,
  heldIn,
  namedIn,
  questsIn,
  resourcesIn,
  revealedRows,
  type Skill,
  scoresIn,
  skillsIn,
  traitsIn,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"
import type { LedgerLine } from "akasha/story/world/stories/played/modules/purse-ledger/purse-ledger.module.code.ts"
import { useEffect, useState } from "react"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const DESCRIPTION_KEY = "description"

const CHARACTER_KEY = "character"

const CHARACTERS_KEY = "characters"

const VALUE_KEY = "value"

const MAX_VALUE_KEY = "maxValue"

const HISTORY_KEY = "history"

const SKILL_KEY = "skill"

const RANK_KEY = "rank"

const LEVEL_KEY = "level"

const AXIS_KEY = "axis"

const OBJECTIVE_KEY = "objective"

const STATUS_KEY = "status"

const POINTS_KEY = "relationshipPoints"

const ELEMENT_KEY = "element"

const COUNTER_KEY = "counter"

const TRAIT_KEY = "trait"

export type Filed = {
  readonly pools: Record<string, number>
  readonly delta: Record<string, number>
  readonly level?: number
  readonly attributes: Readonly<Record<string, number>>
  readonly resources?: Readonly<Record<string, string | number>>
  readonly purse?: Readonly<Record<string, string | number>>
  readonly ledgers?: Readonly<Record<string, readonly LedgerLine[]>>
  readonly skills: readonly Skill[]
  readonly traits: readonly Skill[]
  readonly legacies: readonly Skill[]
  readonly species?: string
  readonly calling?: string
  readonly rank?: string
  readonly status?: string
  readonly quests: readonly Quest[]
  readonly bonds: readonly Counted[]
  readonly attunements: readonly Counted[]
  readonly had: Had | null
}

const NOTHING_FILED: Filed = {
  pools: {},
  delta: {},
  attributes: {},
  skills: [],
  traits: [],
  legacies: [],
  quests: [],
  bonds: [],
  attunements: [],
  had: null,
}

type Named = {
  readonly titles: ReadonlyMap<string, string>
  readonly descriptions: ReadonlyMap<string, string>
}

async function titlesOf(named: ReadonlyMap<string, readonly string[]>): Promise<Named> {
  const titles = new Map<string, string>()
  const descriptions = new Map<string, string>()
  await Promise.all(
    [...named].map(async ([type, slugs]) => {
      const asked = await askedLoudly({
        "page-type": type,
        where: { slug: { in: [...slugs] } },
        keys: [SLUG_KEY, TITLE_KEY, DESCRIPTION_KEY],
      })
      if (!asked.ok) return
      for (const row of asked.answer.rows) {
        const slug = textIn(row.values[SLUG_KEY])
        if (slug === null) continue
        const title = textIn(row.values[TITLE_KEY])
        const description = textIn(row.values[DESCRIPTION_KEY])
        if (title !== null) titles.set(`${type}/${slug}`, title)
        if (description !== null) descriptions.set(`${type}/${slug}`, description)
      }
    })
  )
  return { titles, descriptions }
}

const UNREVEALED_KEY = "unrevealed"

const DISPLAY_ORDER_KEY = "displayOrder"

const REVEALED_AS_KEY = "revealedAs"

function rowsOf(asked: Asked): readonly QueryRow[] {
  return asked.ok ? revealedRows(asked.answer.rows) : []
}

const SPECIES_KEY = "species"

const CLASS_KEY = "class"

const CONDITION_KEY = "condition"

const LEGACY_KEY = "legacy"

const LISTED = ", "

const HELD_KINDS: readonly (readonly [string, string])[] = [
  [worldSpecies.slug, SPECIES_KEY],
  [worldClass.slug, CLASS_KEY],
  [worldCondition.slug, CONDITION_KEY],
  [worldLegacy.slug, LEGACY_KEY],
  [worldRank.slug, RANK_KEY],
]

const RANKED = new Set([LEGACY_KEY])

function unsaid(): undefined {
  return undefined
}

async function askedHeld(type: string, key: string, character: string): Promise<Asked> {
  return await askedLoudly(
    {
      "page-type": type,
      where: { character: { is: character } },
      keys: [
        CHARACTER_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DESCRIPTION_KEY,
        key,
        UNREVEALED_KEY,
        ...(RANKED.has(key) ? [RANK_KEY] : []),
      ],
      "undeclared-matches-none": true,
    },
    undefined,
    unsaid
  )
}

async function readFiled(character: string, turn: number): Promise<Filed> {
  const { purse, ledgers } = await readPurses(character, turn)
  const [resources, scores, holdings, quests, bonds, attunements, traits, had] = await Promise.all([
    askedLoudly({
      "page-type": metricCharacterResource.slug,
      where: { character: { is: character } },
      keys: [
        TYPE_KEY,
        CHARACTER_KEY,
        VALUE_KEY,
        MAX_VALUE_KEY,
        HISTORY_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DISPLAY_ORDER_KEY,
        REVEALED_AS_KEY,
        UNREVEALED_KEY,
      ],
      files: [HISTORY_KEY],
    }),
    askedLoudly({
      "page-type": metricCharacterAttribute.slug,
      where: { character: { is: character } },
      keys: [TYPE_KEY, CHARACTER_KEY, VALUE_KEY, SLUG_KEY, TITLE_KEY, UNREVEALED_KEY],
    }),
    askedLoudly({
      "page-type": worldSkill.slug,
      where: { character: { is: character } },
      keys: [
        CHARACTER_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DESCRIPTION_KEY,
        SKILL_KEY,
        RANK_KEY,
        LEVEL_KEY,
        AXIS_KEY,
        UNREVEALED_KEY,
      ],
    }),
    askedLoudly({
      "page-type": worldQuest.slug,
      where: { character: { is: character } },
      keys: [CHARACTER_KEY, SLUG_KEY, TITLE_KEY, OBJECTIVE_KEY, STATUS_KEY, UNREVEALED_KEY],
    }),
    askedLoudly({
      "page-type": worldRelationship.slug,
      where: { characters: { has: character } },
      keys: [CHARACTERS_KEY, POINTS_KEY, UNREVEALED_KEY],
    }),
    askedLoudly({
      "page-type": worldAttunement.slug,
      where: { character: { is: character } },
      keys: [CHARACTER_KEY, ELEMENT_KEY, RANK_KEY, COUNTER_KEY, UNREVEALED_KEY],
    }),
    askedLoudly({
      "page-type": characterTrait.slug,
      where: { character: { is: character } },
      keys: [
        CHARACTER_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DESCRIPTION_KEY,
        TRAIT_KEY,
        RANK_KEY,
        UNREVEALED_KEY,
      ],
    }),
    itemsOf(character),
  ])
  const heldAsked = await Promise.all(
    HELD_KINDS.map(async ([type, key]) => rowsOf(await askedHeld(type, key, character)))
  )
  const [speciesRows = [], classRows = [], conditionRows = [], legacyRows = [], rankRows = []] =
    heldAsked
  const skillRows = rowsOf(holdings)
  const bondRows = rowsOf(bonds)
  const attunementRows = rowsOf(attunements)
  const traitRows = rowsOf(traits)
  const { titles, descriptions } = await titlesOf(
    namedIn(
      [
        ...skillRows,
        ...bondRows,
        ...attunementRows,
        ...traitRows,
        ...speciesRows,
        ...classRows,
        ...conditionRows,
        ...legacyRows,
        ...rankRows,
      ],
      [SKILL_KEY, RANK_KEY, CHARACTERS_KEY, ELEMENT_KEY, TRAIT_KEY, ...HELD_KINDS.map(([, k]) => k)]
    )
  )
  const namesOf = (rows: readonly QueryRow[], key: string): string | undefined => {
    const names = heldIn(rows, key, titles).map((one) => one.name)
    return names.length === 0 ? undefined : names.join(LISTED)
  }
  const species = namesOf(speciesRows, SPECIES_KEY)
  const calling = namesOf(classRows, CLASS_KEY)
  const rank = namesOf(rankRows, RANK_KEY)
  const status = namesOf(conditionRows, CONDITION_KEY)
  const resourceRows = rowsOf(resources)
  const pools = poolsIn(resourceRows, turn)
  const scored = scoresIn(rowsOf(scores))
  const held = resourcesIn(resourceRows)
  return {
    pools: pools.pools,
    delta: pools.delta,
    ...(scored.level === undefined ? {} : { level: scored.level }),
    attributes: scored.attributes,
    ...(Object.keys(held).length === 0 ? {} : { resources: held }),
    ...(Object.keys(purse).length === 0 ? {} : { purse }),
    ...(Object.keys(ledgers).length === 0 ? {} : { ledgers }),
    skills: skillsIn(skillRows, titles, descriptions),
    traits: traitsIn(traitRows, titles, descriptions),
    legacies: heldIn(legacyRows, LEGACY_KEY, titles, descriptions),
    ...(species === undefined ? {} : { species }),
    ...(calling === undefined ? {} : { calling }),
    ...(rank === undefined ? {} : { rank }),
    ...(status === undefined ? {} : { status }),
    quests: questsIn(rowsOf(quests)),
    bonds: bondsIn(bondRows, character, titles),
    attunements: attunementsIn(attunementRows, titles),
    had,
  }
}

function filedNothing(filed: Filed): boolean {
  return (
    Object.keys(filed.pools).length === 0 &&
    filed.level === undefined &&
    Object.keys(filed.attributes).length === 0 &&
    filed.purse === undefined &&
    filed.skills.length === 0 &&
    filed.traits.length === 0 &&
    filed.legacies.length === 0 &&
    filed.species === undefined &&
    filed.calling === undefined &&
    filed.rank === undefined &&
    filed.status === undefined &&
    filed.quests.length === 0 &&
    filed.bonds.length === 0 &&
    filed.attunements.length === 0 &&
    filed.had === null
  )
}

function ledgersOf(
  ledgers: Readonly<Record<string, readonly LedgerLine[]>>
): Record<string, LedgerLine[]> {
  return Object.fromEntries(Object.entries(ledgers).map(([name, lines]) => [name, [...lines]]))
}

function sheetOf(filed: Filed): RevealedSheet {
  return {
    ...(filed.level === undefined ? {} : { level: filed.level }),
    ...(Object.keys(filed.attributes).length === 0 ? {} : { attributes: { ...filed.attributes } }),
    ...(filed.resources === undefined ? {} : { resources: { ...filed.resources } }),
    ...(filed.purse === undefined ? {} : { purse: { ...filed.purse } }),
    ...(filed.ledgers === undefined ? {} : { ledgers: ledgersOf(filed.ledgers) }),
    ...(filed.skills.length === 0 ? {} : { skills: [...filed.skills] }),
    ...(filed.traits.length === 0 ? {} : { traits: [...filed.traits] }),
    ...(filed.legacies.length === 0 ? {} : { legacies: [...filed.legacies] }),
    ...(filed.species === undefined ? {} : { kind: filed.species }),
    ...(filed.calling === undefined ? {} : { class: filed.calling }),
    ...(filed.rank === undefined ? {} : { rank: filed.rank }),
    ...(filed.status === undefined ? {} : { status: filed.status }),
    ...(filed.bonds.length === 0 ? {} : { bonds: [...filed.bonds] }),
    ...(filed.attunements.length === 0 ? {} : { affinities: [...filed.attunements] }),
    ...(filed.had === null
      ? {}
      : { equipment: { ...filed.had.worn }, inventory: [...filed.had.carried] }),
  }
}

export function stateOf(filed: Filed, turn: number, name: string | undefined): GameState | null {
  if (filedNothing(filed)) return null
  return {
    turn,
    quests: [...filed.quests],
    hud: {
      ...(filed.level === undefined ? {} : { level: filed.level }),
      pools: { ...filed.pools },
      delta: { ...filed.delta },
    },
    revealed: {
      ...(name === undefined ? {} : { name }),
      ...sheetOf(filed),
    },
  }
}

export function usePlayedState(character: string, turn: number | null): Filed | null {
  const slug = slugIn(character) ?? ""
  const [filed, setFiled] = useState<Filed | null>(null)

  useEffect(() => {
    setFiled(null)
    if (slug === "" || turn === null) {
      setFiled(NOTHING_FILED)
      return
    }
    let alive = true
    void (async () => {
      const held = await readFiled(character, turn).catch((thrown: unknown) => {
        reportThrown(`reading the sheet of ${character}`, thrown)
        return NOTHING_FILED
      })
      if (alive) setFiled(held)
    })()
    return () => {
      alive = false
    }
  }, [character, slug, turn])

  return filed
}
