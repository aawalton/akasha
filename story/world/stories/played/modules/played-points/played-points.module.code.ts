import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import { metricCharacterPoint } from "akasha/story/world/mechanics/metrics/metric-character/resource/point/metric-character-point.page-type.ts"
import {
  type BeatOverlay,
  overlaidRows,
} from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
import { askedLoudly } from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import { revealedRows } from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

const TYPE_KEY = "type"

const SLUG_KEY = "slug"

const CHARACTER_KEY = "character"

const VALUE_KEY = "value"

const DISPLAY_ORDER_KEY = "displayOrder"

const UNREVEALED_KEY = "unrevealed"

const PARTED = "/"

const JOIN = "-"

const PLURAL = "s"

const FALLBACK = "point"

export type Point = { readonly label: string; readonly value: number }

export type Pointed = {
  readonly points: readonly Point[]
  readonly pages: ReadonlySet<string>
}

function pageOf(row: QueryRow): string | null {
  const type = textIn(row.values[TYPE_KEY])
  const slug = textIn(row.values[SLUG_KEY])
  return type === null || slug === null ? null : `${type}${PARTED}${slug}`
}

function capitalOf(word: string): string {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
}

export function labelOf(type: string, slug: string, character: string, value: number): string {
  const holder = character.slice(character.lastIndexOf(PARTED) + 1)
  const theirs = new Set(holder.split(JOIN))
  const own = slug.startsWith(`${holder}${JOIN}`) ? slug.slice(holder.length + 1).split(JOIN) : []
  const words = [...own, ...type.split(JOIN)].filter((word) => word !== "" && !theirs.has(word))
  const said = words.length === 0 ? [FALLBACK] : words
  const last = said.length - 1
  const counted = said.map((word, at) => (at === last ? countedOf(word, value) : word))
  return counted.map(capitalOf).join(" ")
}

function countedOf(word: string, value: number): string {
  const one = word.endsWith(PLURAL) ? word.slice(0, -PLURAL.length) : word
  return value === 1 ? one : `${one}${PLURAL}`
}

type Ordered = Point & { readonly order: number | undefined }

function byOrder(one: Ordered, other: Ordered): number {
  if (one.order !== undefined && other.order !== undefined && one.order !== other.order) {
    return one.order - other.order
  }
  if (one.order !== undefined && other.order === undefined) return -1
  if (one.order === undefined && other.order !== undefined) return 1
  return one.label.localeCompare(other.label)
}

export function pointsIn(rows: readonly QueryRow[], character: string): Pointed {
  const pages = new Set<string>()
  const held: Ordered[] = []
  for (const row of rows) {
    const page = pageOf(row)
    if (page === null) continue
    pages.add(page)
    const value = parseNumber(row.values[VALUE_KEY])
    if (value === undefined || value <= 0) continue
    const type = page.slice(0, page.indexOf(PARTED))
    const slug = page.slice(page.indexOf(PARTED) + 1)
    held.push({
      label: labelOf(type, slug, character, value),
      value,
      order: parseNumber(row.values[DISPLAY_ORDER_KEY]),
    })
  }
  const points = held.toSorted(byOrder).map(({ label, value }) => ({ label, value }))
  return { points, pages }
}

export function unpointed(rows: readonly QueryRow[], pointed: Pointed): readonly QueryRow[] {
  return rows.filter((row) => {
    const page = pageOf(row)
    return page === null || !pointed.pages.has(page)
  })
}

export async function pointsOf(character: string, overlay: BeatOverlay): Promise<Pointed> {
  const asked = await askedLoudly({
    "page-type": metricCharacterPoint.slug,
    where: { character: { is: character } },
    keys: [TYPE_KEY, CHARACTER_KEY, SLUG_KEY, VALUE_KEY, DISPLAY_ORDER_KEY, UNREVEALED_KEY],
  })
  const rows = asked.ok ? revealedRows(asked.answer.rows) : []
  return pointsIn(overlaidRows(rows, metricCharacterPoint.slug, overlay), character)
}
