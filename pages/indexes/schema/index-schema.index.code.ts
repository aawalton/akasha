import { join } from "node:path"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { indexSchema } from "akasha/pages/indexes/schema/index-schema.index.ts"
import type { Schema } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { slugAt, textAt, type Value } from "akasha/pages/value/page-value.module.code.ts"

const SCHEMA = indexSchema.name

const ENDING = ".jsonl"

const PROPERTY = "page-property"

const SLUG = "slug"

const UNIQUE_PROPERTY = "uniqueProperty"

const TARGET_PAGE_TYPE = "targetPageType"

export function schemaIn(value: Value): readonly Entry[] {
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (pageTypeSlug === null) return []
  const slug = textAt(value, "slug")
  if (slug === null) return []
  const propertySlug = textAt(value, "propertySlug")
  if (propertySlug === null) return []
  const held: Schema = {
    pageTypeSlug,
    targetPageTypeSlug: slugAt(value, TARGET_PAGE_TYPE),
    unique: slugAt(value, "unique"),
    uniquePropertySlug: slugAt(value, UNIQUE_PROPERTY),
    slug,
    propertySlug,
    fileName: textAt(value, "fileName"),
    folderName: textAt(value, "folderName"),
  }
  return [
    {
      at: join(SCHEMA, PROPERTY, pageTypeSlug, SLUG, `${slug}${ENDING}`),
      line: JSON.stringify(held),
    },
  ]
}
