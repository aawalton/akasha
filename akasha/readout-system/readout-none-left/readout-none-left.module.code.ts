import type { Fetcher } from "@akasha/pages-query/fetcher"
import { askNamed } from "@shared/pages-query"

const READOUTS_ALL = "readouts-all"

export type NoneLeft = {
  readonly words?: string
  readonly emoji?: string
}

export function stated(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length === 0 ? undefined : trimmed
}

export function noneLeftIn(values: Readonly<Record<string, unknown>>): NoneLeft {
  const words = stated(values["none-left-words"])
  const emoji = stated(values["none-left-emoji"])
  return {
    ...(words === undefined ? {} : { words }),
    ...(emoji === undefined ? {} : { emoji }),
  }
}

export async function readNoneLeft(readoutSlug: string, fetcher?: Fetcher): Promise<NoneLeft> {
  const asked = await askNamed(READOUTS_ALL, fetcher)
  if (!asked.ok) return {}

  const row = asked.answer.rows.find((r) => r.values.slug === readoutSlug)
  if (row === undefined) return {}
  return noneLeftIn(row.values)
}
