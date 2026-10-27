"use client"

import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type {
  Asked,
  QueryRow,
} from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"

import { worldAttunement } from "akasha/story/world/mechanics/attunements/world-attunement.page-type.ts"
import { worldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.ts"
import { worldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.ts"
import { itemsOf } from "akasha/story/world/mechanics/items/story-item/modules/character-items-beside/character-items-beside.module.code.ts"
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
  type BeatOverlay,
  NO_OVERLAY,
  overlaidRows,
} from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
import {
  askedLoudly,
  reportThrown,
  titlesOf,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import {
  pointsOf,
  unpointed,
} from "akasha/story/world/stories/played/modules/played-points/played-points.module.code.ts"
import { poolsIn } from "akasha/story/world/stories/played/modules/played-pools/played-pools.module.code.ts"
import { readPurses } from "akasha/story/world/stories/played/modules/played-purses/played-purses.module.code.ts"
import {
  attunementsIn,
  bondsIn,
  experienceIn,
  heldIn,
  namedIn,
  questsIn,
  resourcesIn,
  revealedRows,
  scoresIn,
  skillsIn,
  traitsIn,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"
import {
  ATTRIBUTE_KEY,
  EXPERIENCE_KEY,
  skillMoreOf,
} from "akasha/story/world/stories/played/modules/played-skills/played-skills.module.code.ts"
import type { Filed } from "akasha/story/world/stories/played/modules/played-state-sheet/played-state-sheet.module.code.ts"
import { titlesHeldOf } from "akasha/story/world/stories/played/modules/played-titles/played-titles.module.code.ts"
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
        TYPE_KEY,
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

async function readFiled(
  character: string,
  turn: number,
  overlay: BeatOverlay = NO_OVERLAY
): Promise<Filed> {
  const { purse, ledgers } = await readPurses(character, turn, overlay)
  const pointed = await pointsOf(character, overlay)
  const named = await titlesHeldOf(character, overlay)
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
      keys: [
        TYPE_KEY,
        CHARACTER_KEY,
        VALUE_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DISPLAY_ORDER_KEY,
        UNREVEALED_KEY,
      ],
    }),
    askedLoudly({
      "page-type": worldSkill.slug,
      where: { character: { is: character } },
      keys: [
        TYPE_KEY,
        CHARACTER_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DESCRIPTION_KEY,
        SKILL_KEY,
        RANK_KEY,
        LEVEL_KEY,
        AXIS_KEY,
        EXPERIENCE_KEY,
        ATTRIBUTE_KEY,
        UNREVEALED_KEY,
      ],
    }),
    askedLoudly({
      "page-type": worldQuest.slug,
      where: { character: { is: character } },
      keys: [
        TYPE_KEY,
        CHARACTER_KEY,
        SLUG_KEY,
        TITLE_KEY,
        OBJECTIVE_KEY,
        STATUS_KEY,
        UNREVEALED_KEY,
      ],
    }),
    askedLoudly({
      "page-type": worldRelationship.slug,
      where: { characters: { has: character } },
      keys: [TYPE_KEY, SLUG_KEY, CHARACTERS_KEY, POINTS_KEY, UNREVEALED_KEY],
    }),
    askedLoudly({
      "page-type": worldAttunement.slug,
      where: { character: { is: character } },
      keys: [TYPE_KEY, SLUG_KEY, CHARACTER_KEY, ELEMENT_KEY, RANK_KEY, COUNTER_KEY, UNREVEALED_KEY],
    }),
    askedLoudly({
      "page-type": characterTrait.slug,
      where: { character: { is: character } },
      keys: [
        TYPE_KEY,
        CHARACTER_KEY,
        SLUG_KEY,
        TITLE_KEY,
        DESCRIPTION_KEY,
        TRAIT_KEY,
        RANK_KEY,
        UNREVEALED_KEY,
      ],
    }),
    itemsOf(character, overlay),
  ])
  const heldAsked = await Promise.all(
    HELD_KINDS.map(async ([type, key]) =>
      overlaidRows(rowsOf(await askedHeld(type, key, character)), type, overlay)
    )
  )
  const [speciesRows = [], classRows = [], conditionRows = [], legacyRows = [], rankRows = []] =
    heldAsked
  const skillRows = overlaidRows(rowsOf(holdings), worldSkill.slug, overlay)
  const bondRows = overlaidRows(rowsOf(bonds), worldRelationship.slug, overlay)
  const attunementRows = overlaidRows(rowsOf(attunements), worldAttunement.slug, overlay)
  const traitRows = overlaidRows(rowsOf(traits), characterTrait.slug, overlay)
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
      [
        SKILL_KEY,
        RANK_KEY,
        CHARACTERS_KEY,
        ELEMENT_KEY,
        TRAIT_KEY,
        ATTRIBUTE_KEY,
        ...HELD_KINDS.map(([, k]) => k),
      ]
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
  const resourceRows = overlaidRows(rowsOf(resources), metricCharacterResource.slug, overlay)
  const pools = poolsIn(resourceRows, turn)
  const scored = scoresIn(overlaidRows(rowsOf(scores), metricCharacterAttribute.slug, overlay))
  const held = resourcesIn(unpointed(resourceRows, pointed))
  const earned = experienceIn(resourceRows)
  return {
    pools: pools.pools,
    delta: pools.delta,
    ...(scored.level === undefined ? {} : { level: scored.level }),
    attributes: scored.attributes,
    ...(Object.keys(held).length === 0 ? {} : { resources: held }),
    ...(earned.length === 0 ? {} : { experience: earned }),
    ...(pointed.points.length === 0 ? {} : { points: pointed.points }),
    ...(named.length === 0 ? {} : { titles: named }),
    ...(Object.keys(purse).length === 0 ? {} : { purse }),
    ...(Object.keys(ledgers).length === 0 ? {} : { ledgers }),
    skills: skillsIn(skillRows, titles, descriptions, skillMoreOf(titles)),
    traits: traitsIn(traitRows, titles, descriptions),
    legacies: heldIn(legacyRows, LEGACY_KEY, titles, descriptions),
    ...(species === undefined ? {} : { species }),
    ...(calling === undefined ? {} : { calling }),
    ...(rank === undefined ? {} : { rank }),
    ...(status === undefined ? {} : { status }),
    quests: questsIn(overlaidRows(rowsOf(quests), worldQuest.slug, overlay)),
    bonds: bondsIn(bondRows, character, titles),
    attunements: attunementsIn(attunementRows, titles),
    had,
  }
}

export function usePlayedState(
  character: string,
  turn: number | null,
  overlay: BeatOverlay = NO_OVERLAY
): Filed | null {
  const slug = slugIn(character) ?? ""
  const [filed, setFiled] = useState<Filed | null>(null)

  useEffect(() => {
    if (slug === "" || turn === null) {
      setFiled(NOTHING_FILED)
      return
    }
    let alive = true
    void (async () => {
      const held = await readFiled(character, turn, overlay).catch((thrown: unknown) => {
        reportThrown(`reading the sheet of ${character}`, thrown)
        return NOTHING_FILED
      })
      if (alive) setFiled(held)
    })()
    return () => {
      alive = false
    }
  }, [character, slug, turn, overlay])

  return filed
}
