"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
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
import {
  type Had,
  itemsOf,
} from "akasha/story/world/mechanics/items/story-item/modules/character-items-beside/character-items-beside.module.code.ts"
import { metricCharacterAttribute } from "akasha/story/world/mechanics/metrics/metric-character/attribute/metric-character-attribute.page-type.ts"
import { metricCharacterResource } from "akasha/story/world/mechanics/metrics/metric-character/resource/metric-character-resource.page-type.ts"
import { worldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.ts"
import { worldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import {
  attunementsIn,
  bondsIn,
  type Counted,
  namedIn,
  questsIn,
  resourcesIn,
  type Skill,
  scoresIn,
  skillsIn,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"
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

const TURN_KEY = "turn"

const MAX = "Max"

const LINE_BREAK = "\n"

const LAST = -1

const BEFORE_LAST = -2

type Line = { readonly turn: number; readonly value: number }

export type Filed = {
  readonly pools: Record<string, number>
  readonly delta: Record<string, number>
  readonly level?: number
  readonly attributes: Readonly<Record<string, number>>
  readonly resources?: Readonly<Record<string, string | number>>
  readonly skills: readonly Skill[]
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
  quests: [],
  bonds: [],
  attunements: [],
  had: null,
}

function lineIn(text: string): Line | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return null
  }
  if (!isRecord(parsed)) return null
  const turn = parseNumber(parsed[TURN_KEY])
  const value = parseNumber(parsed[VALUE_KEY])
  return turn === undefined || value === undefined ? null : { turn, value }
}

export function linesIn(held: unknown): readonly Line[] {
  if (typeof held !== "string") return []
  const lines: Line[] = []
  for (const text of held.split(LINE_BREAK)) {
    const line = text.trim() === "" ? null : lineIn(text)
    if (line !== null) lines.push(line)
  }
  return lines
}

export function changeIn(lines: readonly Line[], turn: number): number | undefined {
  const last = lines.at(LAST)
  const before = lines.at(BEFORE_LAST)
  if (last === undefined || before === undefined || last.turn !== turn) return undefined
  const change = last.value - before.value
  return change === 0 ? undefined : change
}

export function poolsIn(rows: readonly QueryRow[], turn: number): Pick<Filed, "pools" | "delta"> {
  const pools: Record<string, number> = {}
  const delta: Record<string, number> = {}
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined) continue
    pools[type] = value
    const most = parseNumber(row.values[MAX_VALUE_KEY])
    if (most !== undefined) pools[`${type}${MAX}`] = most
    const change = changeIn(linesIn(row.values[HISTORY_KEY]), turn)
    if (change !== undefined) delta[type] = change
  }
  return { pools, delta }
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

export function revealedRows(rows: readonly QueryRow[]): readonly QueryRow[] {
  return rows.filter((row) => row.values[UNREVEALED_KEY] !== true)
}

function rowsOf(asked: Asked): readonly QueryRow[] {
  return asked.ok ? revealedRows(asked.answer.rows) : []
}

async function readFiled(character: string, turn: number): Promise<Filed> {
  const [resources, scores, holdings, quests, bonds, attunements, had] = await Promise.all([
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
      keys: [CHARACTER_KEY, SKILL_KEY, RANK_KEY, LEVEL_KEY, AXIS_KEY, UNREVEALED_KEY],
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
    itemsOf(character),
  ])
  const skillRows = rowsOf(holdings)
  const bondRows = rowsOf(bonds)
  const attunementRows = rowsOf(attunements)
  const { titles, descriptions } = await titlesOf(
    namedIn(
      [...skillRows, ...bondRows, ...attunementRows],
      [SKILL_KEY, RANK_KEY, CHARACTERS_KEY, ELEMENT_KEY]
    )
  )
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
    skills: skillsIn(skillRows, titles, descriptions),
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
    filed.skills.length === 0 &&
    filed.quests.length === 0 &&
    filed.bonds.length === 0 &&
    filed.attunements.length === 0 &&
    filed.had === null
  )
}

function sheetOf(filed: Filed): RevealedSheet {
  return {
    ...(filed.level === undefined ? {} : { level: filed.level }),
    ...(Object.keys(filed.attributes).length === 0 ? {} : { attributes: { ...filed.attributes } }),
    ...(filed.resources === undefined ? {} : { resources: { ...filed.resources } }),
    ...(filed.skills.length === 0 ? {} : { skills: [...filed.skills] }),
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
