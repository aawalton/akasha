"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn, slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { Quest } from "akasha/story/engine/core/modules/quest-schema/quest-schema.module.code.ts"
import type { GameState } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { metricCharacterResource } from "akasha/story/world/mechanics/metrics/metric-character/resource/metric-character-resource.page-type.ts"
import { worldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { useEffect, useState } from "react"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const CHARACTER_KEY = "character"

const VALUE_KEY = "value"

const MAX_VALUE_KEY = "maxValue"

const HISTORY_KEY = "history"

const SKILL_KEY = "skill"

const RANK_KEY = "rank"

const LEVEL_KEY = "level"

const AXIS_KEY = "axis"

const TURN_KEY = "turn"

const OBJECTIVE_KEY = "objective"

const REWARD_KEY = "reward"

const STATUS_KEY = "status"

const COMPLETE = "complete"

const ACTIVE = "active"

const MAX = "Max"

const LINE_BREAK = "\n"

const LAST = -1

const BEFORE_LAST = -2

type Line = { readonly turn: number; readonly value: number }

type Skill = {
  readonly name: string
  readonly rank?: string
  readonly score?: number
  readonly note?: string
}

export type Filed = {
  readonly pools: Record<string, number>
  readonly delta: Record<string, number>
  readonly skills: readonly Skill[]
  readonly quests: readonly Quest[]
}

const NOTHING_FILED: Filed = { pools: {}, delta: {}, skills: [], quests: [] }

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

function titleAt(named: unknown, titles: ReadonlyMap<string, string>): string | undefined {
  const address = textIn(named)
  return address === null ? undefined : titles.get(address)
}

export function skillsIn(
  rows: readonly QueryRow[],
  titles: ReadonlyMap<string, string>
): readonly Skill[] {
  const skills: Skill[] = []
  for (const row of rows) {
    const name = titleAt(row.values[SKILL_KEY], titles)
    if (name === undefined) continue
    const rank = titleAt(row.values[RANK_KEY], titles)
    const score = parseNumber(row.values[LEVEL_KEY])
    const note = textIn(row.values[AXIS_KEY])
    skills.push({
      name,
      ...(rank === undefined ? {} : { rank }),
      ...(score === undefined ? {} : { score }),
      ...(note === null ? {} : { note }),
    })
  }
  return skills.toSorted((one, other) => one.name.localeCompare(other.name))
}

export function questsIn(rows: readonly QueryRow[]): readonly Quest[] {
  const quests: Quest[] = []
  for (const row of rows) {
    const id = textIn(row.values[SLUG_KEY])
    const title = textIn(row.values[TITLE_KEY])
    const objective = textIn(row.values[OBJECTIVE_KEY])
    if (id === null || title === null || objective === null) continue
    const reward = textIn(row.values[REWARD_KEY])
    quests.push({
      id,
      title,
      objective,
      ...(reward === null ? {} : { reward }),
      status: textIn(row.values[STATUS_KEY]) === COMPLETE ? COMPLETE : ACTIVE,
    })
  }
  return quests
}

function namedIn(
  rows: readonly QueryRow[],
  keys: readonly string[]
): ReadonlyMap<string, string[]> {
  const named = new Map<string, string[]>()
  for (const row of rows) {
    for (const key of keys) {
      const address = addressIn(textIn(row.values[key]) ?? "")
      if (address.kind !== "qualified") continue
      const slugs = named.get(address.pageTypeSlug) ?? []
      if (!slugs.includes(address.slug)) slugs.push(address.slug)
      named.set(address.pageTypeSlug, slugs)
    }
  }
  return named
}

async function titlesOf(
  named: ReadonlyMap<string, readonly string[]>
): Promise<ReadonlyMap<string, string>> {
  const titles = new Map<string, string>()
  await Promise.all(
    [...named].map(async ([type, slugs]) => {
      const asked = await askComposed({
        "page-type": type,
        where: { slug: { in: [...slugs] } },
        keys: [SLUG_KEY, TITLE_KEY],
      })
      if (!asked.ok) return
      for (const row of asked.answer.rows) {
        const slug = textIn(row.values[SLUG_KEY])
        const title = textIn(row.values[TITLE_KEY])
        if (slug !== null && title !== null) titles.set(`${type}/${slug}`, title)
      }
    })
  )
  return titles
}

function namingOnly(character: string): Record<string, string> {
  return { "starts-with": character, "ends-with": character }
}

async function readFiled(character: string, turn: number): Promise<Filed> {
  const [resources, holdings, quests] = await Promise.all([
    askComposed({
      "page-type": metricCharacterResource.slug,
      where: { character: { is: character } },
      keys: [TYPE_KEY, CHARACTER_KEY, VALUE_KEY, MAX_VALUE_KEY, HISTORY_KEY],
      files: [HISTORY_KEY],
    }),
    askComposed({
      "page-type": worldSkill.slug,
      where: { character: namingOnly(character) },
      keys: [CHARACTER_KEY, SKILL_KEY, RANK_KEY, LEVEL_KEY, AXIS_KEY],
    }),
    askComposed({
      "page-type": worldQuest.slug,
      where: { character: namingOnly(character) },
      keys: [CHARACTER_KEY, SLUG_KEY, TITLE_KEY, OBJECTIVE_KEY, REWARD_KEY, STATUS_KEY],
    }),
  ])
  const skillRows = holdings.ok ? holdings.answer.rows : []
  const titles = await titlesOf(namedIn(skillRows, [SKILL_KEY, RANK_KEY]))
  const pools = resources.ok ? poolsIn(resources.answer.rows, turn) : NOTHING_FILED
  return {
    pools: pools.pools,
    delta: pools.delta,
    skills: skillsIn(skillRows, titles),
    quests: quests.ok ? questsIn(quests.answer.rows) : [],
  }
}

export function stateOver(
  kept: GameState | null,
  filed: Filed,
  turn: number,
  name: string | undefined
): GameState | null {
  const nothing =
    Object.keys(filed.pools).length === 0 && filed.skills.length === 0 && filed.quests.length === 0
  if (nothing) return kept
  return {
    ...kept,
    turn: kept?.turn ?? turn,
    quests: [...filed.quests],
    hud: {
      ...kept?.hud,
      pools: { ...kept?.hud?.pools, ...filed.pools },
      delta: { ...kept?.hud?.delta, ...filed.delta },
    },
    revealed: {
      ...kept?.revealed,
      ...(name === undefined ? {} : { name }),
      ...(filed.skills.length === 0 ? {} : { skills: [...filed.skills] }),
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
      const held = await readFiled(character, turn).catch(() => NOTHING_FILED)
      if (alive) setFiled(held)
    })()
    return () => {
      alive = false
    }
  }, [character, slug, turn])

  return filed
}
