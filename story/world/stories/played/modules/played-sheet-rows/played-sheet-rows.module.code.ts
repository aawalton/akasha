import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import type { Quest } from "akasha/story/engine/core/modules/quest-schema/quest-schema.module.code.ts"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const TITLE_KEY = "title"

const VALUE_KEY = "value"

const SKILL_KEY = "skill"

const RANK_KEY = "rank"

const LEVEL_KEY = "level"

const AXIS_KEY = "axis"

const OBJECTIVE_KEY = "objective"

const REWARD_KEY = "reward"

const STATUS_KEY = "status"

const CHARACTERS_KEY = "characters"

const POINTS_KEY = "relationshipPoints"

const ELEMENT_KEY = "element"

const COUNTER_KEY = "counter"

const COMPLETE = "complete"

const ACTIVE = "active"

const LEVEL_ENDING = "-level"

const LEVEL = "level"

const JOINED = " and "

export type Titles = ReadonlyMap<string, string>

export type Skill = {
  readonly name: string
  readonly rank?: string
  readonly score?: number
  readonly note?: string
}

export type Counted = { readonly name: string; readonly value?: number }

export type Scores = {
  readonly level?: number
  readonly attributes: Readonly<Record<string, number>>
}

function titleAt(named: unknown, titles: Titles): string | undefined {
  const address = textIn(named)
  return address === null ? undefined : titles.get(address)
}

function byName(one: { readonly name: string }, other: { readonly name: string }): number {
  return one.name.localeCompare(other.name)
}

export function namedIn(
  rows: readonly QueryRow[],
  keys: readonly string[]
): ReadonlyMap<string, readonly string[]> {
  const named = new Map<string, string[]>()
  for (const row of rows) {
    for (const key of keys) {
      const held = row.values[key]
      for (const one of typeof held === "string" ? [held] : stringsIn(held)) {
        const address = addressIn(one)
        if (address.kind !== "qualified") continue
        const slugs = named.get(address.pageTypeSlug) ?? []
        if (!slugs.includes(address.slug)) slugs.push(address.slug)
        named.set(address.pageTypeSlug, slugs)
      }
    }
  }
  return named
}

export function scoresIn(rows: readonly QueryRow[]): Scores {
  let level: number | undefined
  let opening = ""
  const held: [string, number][] = []
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined) continue
    if (type.endsWith(LEVEL_ENDING)) {
      level = value
      opening = type.slice(0, type.length - LEVEL.length)
      continue
    }
    held.push([type, value])
  }
  const attributes = held
    .map(([type, value]): [string, number] => [
      (type.startsWith(opening) ? type.slice(opening.length) : type).toUpperCase(),
      value,
    ])
    .toSorted((one, other) => one[0].localeCompare(other[0]))
  return {
    ...(level === undefined ? {} : { level }),
    attributes: Object.fromEntries(attributes),
  }
}

export function skillsIn(rows: readonly QueryRow[], titles: Titles): readonly Skill[] {
  const skills: Skill[] = []
  for (const row of rows) {
    const name = titleAt(row.values[SKILL_KEY], titles)
    if (name === undefined) continue
    const rank = titleAt(row.values[RANK_KEY], titles)
    const score = parseNumber(row.values[LEVEL_KEY]) ?? parseNumber(row.values[RANK_KEY])
    const note = textIn(row.values[AXIS_KEY])
    skills.push({
      name,
      ...(rank === undefined ? {} : { rank }),
      ...(score === undefined ? {} : { score }),
      ...(note === null ? {} : { note }),
    })
  }
  return skills.toSorted(byName)
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

export function bondsIn(
  rows: readonly QueryRow[],
  character: string,
  titles: Titles
): readonly Counted[] {
  const bonds: Counted[] = []
  for (const row of rows) {
    const others = stringsIn(row.values[CHARACTERS_KEY])
      .filter((one) => one !== character)
      .map((one) => titles.get(one))
      .filter((one): one is string => one !== undefined)
    if (others.length === 0) continue
    const value = parseNumber(row.values[POINTS_KEY])
    bonds.push({ name: others.join(JOINED), ...(value === undefined ? {} : { value }) })
  }
  return bonds.toSorted(byName)
}

export function attunementsIn(rows: readonly QueryRow[], titles: Titles): readonly Counted[] {
  const held: Counted[] = []
  for (const row of rows) {
    const element = titleAt(row.values[ELEMENT_KEY], titles)
    const rank = titleAt(row.values[RANK_KEY], titles)
    const value = parseNumber(row.values[COUNTER_KEY])
    if (element === undefined || rank === undefined || value === undefined) continue
    held.push({ name: `${element} ${rank}`, value })
  }
  return held.toSorted(byName)
}
