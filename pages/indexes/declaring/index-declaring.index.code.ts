import { join } from "node:path"
import { indexDeclaring } from "akasha/pages/indexes/declaring/index-declaring.index.ts"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Shape } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const UNIQUE_PROPERTY = "uniqueProperty"

const TARGET_PAGE_TYPE = "targetPageType"

export const DECLARING_UNDER = indexDeclaring.name

export const DECLARING_AT = join(DECLARING_UNDER, "page-property.jsonl")

export function declaredIn(value: Value): readonly Entry[] {
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (pageTypeSlug === null) return []
  const slug = textAt(value, "slug")
  if (slug === null) return []
  const propertySlug = textAt(value, "propertySlug")
  if (propertySlug === null) return []
  const held: Shape = {
    pageTypeSlug,
    targetPageTypeSlug: slugAt(value, TARGET_PAGE_TYPE),
    unique: slugAt(value, "unique"),
    uniquePropertySlug: slugAt(value, UNIQUE_PROPERTY),
    slug,
    propertySlug,
    fileName: textAt(value, "fileName"),
    folderName: textAt(value, "folderName"),
  }
  return [{ at: DECLARING_AT, line: JSON.stringify(held) }]
}
