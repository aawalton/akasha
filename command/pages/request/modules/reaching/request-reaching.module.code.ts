import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textUnder } from "akasha/page/modules/value/page-value.module.code.ts"

const REQUEST = "feature-request"

export const STANDING = "standing"

const NO_SLUG =
  "the request said is empty, and a feature request is named by the slug that request declares"

export type Asked = {
  readonly slug: string
}

export function wrongIn(asked: Asked): readonly string[] {
  return asked.slug.trim() === "" ? [NO_SLUG] : []
}

type Reached = {
  readonly at: string
  readonly standing: string | null
}

export function reachedIn(root: string, slug: string): Reached | null {
  const one = listedAt(root, REQUEST, slug)[0]
  if (one === undefined) return null
  return { at: one.path, standing: textUnder(root, one.path, STANDING) }
}
