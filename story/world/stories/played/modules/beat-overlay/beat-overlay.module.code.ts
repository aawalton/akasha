import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"

export type BeatOverlay = {
  readonly knows: (page: string) => boolean
  readonly shows: (page: string) => boolean
  readonly keysOf: (page: string) => readonly string[]
  readonly valueOf: (page: string, key: string, current: unknown) => unknown
}

const NO_KEYS: readonly string[] = []

const NO_ADDRESSES: readonly string[] = []

function unchanged(current: unknown): unknown {
  return current
}

export const NO_OVERLAY: BeatOverlay = {
  knows: () => false,
  shows: () => true,
  keysOf: () => NO_KEYS,
  valueOf: (_page, _key, current) => unchanged(current),
}

const SLUG_KEY = "slug"

const TYPE_KEY = "type"

const PARTED = "/"

function addressesIn(row: QueryRow, type: string): readonly string[] {
  const slug = textIn(row.values[SLUG_KEY])
  if (slug === null || slug === "") return NO_ADDRESSES
  const own = textIn(row.values[TYPE_KEY])
  if (own === null || own === type) return [`${type}${PARTED}${slug}`]
  return [`${type}${PARTED}${slug}`, `${own}${PARTED}${slug}`]
}

export function overlaidRow(row: QueryRow, type: string, overlay: BeatOverlay): QueryRow | null {
  const page = addressesIn(row, type).find((one) => overlay.knows(one))
  if (page === undefined) return row
  if (!overlay.shows(page)) return null
  const keys = overlay.keysOf(page)
  if (keys.length === 0) return row
  const values = { ...row.values }
  for (const key of keys) values[key] = overlay.valueOf(page, key, values[key])
  return { ...row, values }
}

export function overlaidRows(
  rows: readonly QueryRow[],
  type: string,
  overlay: BeatOverlay
): readonly QueryRow[] {
  return rows.flatMap((row) => {
    const one = overlaidRow(row, type, overlay)
    return one === null ? [] : [one]
  })
}
