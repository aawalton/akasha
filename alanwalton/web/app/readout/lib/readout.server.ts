import { askNamed } from "@shared/pages-query"

const READOUTS_ALL = "readouts-all"

export interface NoneLeft {
  readonly words?: string
  readonly emoji?: string
}

function stated(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length === 0 ? undefined : trimmed
}

export async function readNoneLeft(readoutSlug: string): Promise<NoneLeft> {
  const asked = await askNamed(READOUTS_ALL)
  if (!asked.ok) return {}

  const row = asked.answer.rows.find((r) => r.values.slug === readoutSlug)
  if (row === undefined) return {}

  const words = stated(row.values["none-left-words"])
  const emoji = stated(row.values["none-left-emoji"])
  return {
    ...(words === undefined ? {} : { words }),
    ...(emoji === undefined ? {} : { emoji }),
  }
}
