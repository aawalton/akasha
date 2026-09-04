import { askingFor, type Fetcher } from "@akasha/pages-system-service/calling"

const READOUT = "readout"

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
  const words = stated(values.noneLeftWords)
  const emoji = stated(values.noneLeftEmoji)
  return {
    ...(words === undefined ? {} : { words }),
    ...(emoji === undefined ? {} : { emoji }),
  }
}

export async function readNoneLeft(readoutSlug: string, fetcher?: Fetcher): Promise<NoneLeft> {
  const asked = await askingFor(
    { pageTypeSlug: READOUT, where: { slug: { is: readoutSlug } } },
    fetcher
  )
  if ("refused" in asked) return {}

  const [row] = asked.rows
  if (row === undefined) return {}
  return noneLeftIn(row)
}
