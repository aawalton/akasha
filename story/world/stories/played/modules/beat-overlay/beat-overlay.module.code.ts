import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"

export type BeatOverlay = {
  readonly shows: (page: string) => boolean
  readonly keysOf: (page: string) => readonly string[]
  readonly valueOf: (page: string, key: string, current: unknown) => unknown
}

const NO_KEYS: readonly string[] = []

function unchanged(current: unknown): unknown {
  return current
}

export const NO_OVERLAY: BeatOverlay = {
  shows: () => true,
  keysOf: () => NO_KEYS,
  valueOf: (_page, _key, current) => unchanged(current),
}

const SLUG_KEY = "slug"

const PARTED = "/"

export function overlaidRow(row: QueryRow, type: string, overlay: BeatOverlay): QueryRow | null {
  const slug = textIn(row.values[SLUG_KEY])
  if (slug === null || slug === "") return row
  const page = `${type}${PARTED}${slug}`
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
