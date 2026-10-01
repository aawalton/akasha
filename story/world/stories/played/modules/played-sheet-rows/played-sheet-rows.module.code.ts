import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
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

type Titles = ReadonlyMap<string, string>

export type Skill = {
  readonly name: string
  readonly rank?: string
  readonly score?: number
  readonly note?: string
}

export type Counted = { readonly name: string; readonly value?: number }

type Scores = {
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

const CHARACTER_KEY = "character"

const PARTED = "/"

const JOIN = "-"

function ownNameOf(row: QueryRow): string | null {
  const title = textIn(row.values[TITLE_KEY])
  if (title !== null && title !== "") return title
  const slug = textIn(row.values[SLUG_KEY])
  const character = textIn(row.values[CHARACTER_KEY])
  if (slug === null || character === null) return null
  const holder = `${character.slice(character.lastIndexOf(PARTED) + 1)}${JOIN}`
  return slug.startsWith(holder) && slug.length > holder.length ? slug.slice(holder.length) : null
}

const GENERIC_OPENING = "metric-character-"

function genericKindOf(type: string): string | null {
  return type.startsWith(GENERIC_OPENING) ? type.slice(GENERIC_OPENING.length) : null
}

export function scoresIn(rows: readonly QueryRow[]): Scores {
  let level: number | undefined
  let opening = ""
  const held: [string, number, string | null, string | null][] = []
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined) continue
    if (type.endsWith(LEVEL_ENDING)) {
      level = value
      opening = type.slice(0, type.length - LEVEL.length)
      continue
    }
    held.push([type, value, ownNameOf(row), textIn(row.values[CHARACTER_KEY])])
  }
  const attributes = held
    .map(([type, value, own, character]): [string, number] => [
      (
        own ??
        genericKindOf(type) ??
        (opening !== "" && type.startsWith(opening)
          ? type.slice(opening.length)
          : kindOf(type, character))
      ).toUpperCase(),
      value,
    ])
    .toSorted((one, other) => one[0].localeCompare(other[0]))
  return {
    ...(level === undefined ? {} : { level }),
    attributes: Object.fromEntries(attributes),
  }
}

const MAX_VALUE_KEY = "maxValue"

const OUT_OF = " / "

const SPACE = " "

function kindOf(type: string, character: string | null): string {
  const holder = character === null ? "" : character.slice(character.lastIndexOf(PARTED) + 1)
  const story = holder.slice(0, holder.lastIndexOf(JOIN) + 1)
  return story !== "" && type.startsWith(story) ? type.slice(story.length) : type
}

function resourceNameOf(row: QueryRow, type: string): string {
  const title = textIn(row.values[TITLE_KEY])
  if (title !== null && title !== "") return title.toUpperCase()
  const kind = genericKindOf(type) ?? kindOf(type, textIn(row.values[CHARACTER_KEY]))
  const own = ownNameOf(row)
  return (own === null ? kind : `${own}${JOIN}${kind}`).replaceAll(JOIN, SPACE).toUpperCase()
}

const DISPLAY_ORDER_KEY = "displayOrder"

type Resource = {
  readonly name: string
  readonly shown: string | number
  readonly order: number | undefined
}

function byOrder(one: Resource, other: Resource): number {
  if (one.order !== undefined && other.order !== undefined && one.order !== other.order) {
    return one.order - other.order
  }
  if (one.order !== undefined && other.order === undefined) return -1
  if (one.order === undefined && other.order !== undefined) return 1
  return one.name.localeCompare(other.name)
}

const REVEALED_AS_KEY = "revealedAs"

export function wordsIn(row: QueryRow): string | null {
  const words = textIn(row.values[REVEALED_AS_KEY])
  return words === null || words.trim() === "" ? null : words
}

export function resourcesIn(rows: readonly QueryRow[]): Readonly<Record<string, string | number>> {
  const held: Resource[] = []
  for (const row of rows) {
    const type = textIn(row.values[TYPE_KEY])
    const value = parseNumber(row.values[VALUE_KEY])
    if (type === null || value === undefined) continue
    const most = parseNumber(row.values[MAX_VALUE_KEY])
    const numbers = most === undefined ? value : `${String(value)}${OUT_OF}${String(most)}`
    held.push({
      name: resourceNameOf(row, type),
      shown: wordsIn(row) ?? numbers,
      order: parseNumber(row.values[DISPLAY_ORDER_KEY]),
    })
  }
  return Object.fromEntries(held.toSorted(byOrder).map((one) => [one.name, one.shown]))
}

const CURRENCY_KEY = "currency"

const NAME_KEY = "name"

const WORTH_KEY = "worth"

const COUNTED_APART = ", "

const PURSE = "Purse"

type Denomination = { readonly name: string; readonly worth: number }

export type Currency = { readonly title: string; readonly denominations: readonly Denomination[] }

export function denominationsIn(held: unknown): readonly Denomination[] {
  if (!Array.isArray(held)) return []
  const denominations: Denomination[] = []
  for (const one of held) {
    if (!isRecord(one)) continue
    const name = textIn(one[NAME_KEY])
    const worth = parseNumber(one[WORTH_KEY])
    if (name === null || worth === undefined || worth <= 0) continue
    denominations.push({ name, worth })
  }
  return denominations.toSorted((one, other) => other.worth - one.worth)
}

export function countedIn(value: number, denominations: readonly Denomination[]): string | number {
  const smallest = denominations.at(-1)
  if (smallest === undefined) return value
  let left = value
  const parts: string[] = []
  for (const one of denominations) {
    const count = Math.floor(left / one.worth)
    if (count === 0) continue
    parts.push(`${String(count)} ${one.name}`)
    left -= count * one.worth
  }
  return parts.length === 0 ? `0 ${smallest.name}` : parts.join(COUNTED_APART)
}

export function pursesIn(
  rows: readonly QueryRow[],
  currencies: ReadonlyMap<string, Currency>
): Readonly<Record<string, string | number>> {
  const held: Resource[] = []
  for (const row of rows) {
    const value = parseNumber(row.values[VALUE_KEY])
    if (value === undefined) continue
    const address = textIn(row.values[CURRENCY_KEY])
    const currency = address === null ? undefined : currencies.get(address)
    const title = textIn(row.values[TITLE_KEY])
    held.push({
      name: currency?.title ?? (title === null || title === "" ? PURSE : title),
      shown: wordsIn(row) ?? countedIn(value, currency?.denominations ?? []),
      order: parseNumber(row.values[DISPLAY_ORDER_KEY]),
    })
  }
  return Object.fromEntries(held.toSorted(byOrder).map((one) => [one.name, one.shown]))
}

export function skillsIn(
  rows: readonly QueryRow[],
  titles: Titles,
  descriptions: Titles = new Map()
): readonly Skill[] {
  const skills: Skill[] = []
  for (const row of rows) {
    const name = titleAt(row.values[SKILL_KEY], titles) ?? ownNameOf(row) ?? undefined
    if (name === undefined) continue
    const rank = titleAt(row.values[RANK_KEY], titles)
    const score = parseNumber(row.values[LEVEL_KEY]) ?? parseNumber(row.values[RANK_KEY])
    const note =
      titleAt(row.values[SKILL_KEY], descriptions) ??
      textIn(row.values[DESCRIPTION_KEY]) ??
      textIn(row.values[AXIS_KEY])
    skills.push({
      name,
      ...(rank === undefined ? {} : { rank }),
      ...(score === undefined ? {} : { score }),
      ...(note === null ? {} : { note }),
    })
  }
  return skills.toSorted(byName)
}

const TRAIT_KEY = "trait"

const DESCRIPTION_KEY = "description"

export function traitsIn(
  rows: readonly QueryRow[],
  titles: Titles,
  descriptions: Titles = new Map()
): readonly Skill[] {
  const traits: Skill[] = []
  for (const row of rows) {
    const named = row.values[TRAIT_KEY]
    const name = titleAt(named, titles) ?? ownNameOf(row) ?? undefined
    if (name === undefined) continue
    const score = parseNumber(row.values[RANK_KEY])
    const note = titleAt(named, descriptions) ?? textIn(row.values[DESCRIPTION_KEY])
    traits.push({
      name,
      ...(score === undefined ? {} : { score }),
      ...(note === null ? {} : { note }),
    })
  }
  return traits.toSorted(byName)
}

export function heldIn(
  rows: readonly QueryRow[],
  key: string,
  titles: Titles,
  descriptions: Titles = new Map()
): readonly Skill[] {
  const held: Skill[] = []
  for (const row of rows) {
    const named = row.values[key]
    const name = titleAt(named, titles) ?? ownNameOf(row) ?? undefined
    if (name === undefined) continue
    const score = parseNumber(row.values[RANK_KEY])
    const note = titleAt(named, descriptions) ?? textIn(row.values[DESCRIPTION_KEY])
    held.push({
      name,
      ...(score === undefined ? {} : { score }),
      ...(note === null ? {} : { note }),
    })
  }
  return held.toSorted(byName)
}

export function questsIn(rows: readonly QueryRow[]): readonly Quest[] {
  const quests: Quest[] = []
  for (const row of rows) {
    const id = textIn(row.values[SLUG_KEY])
    const title = textIn(row.values[TITLE_KEY])
    const objective = textIn(row.values[OBJECTIVE_KEY])
    if (id === null || title === null || objective === null) continue
    quests.push({
      id,
      title,
      objective,
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
