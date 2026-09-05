import { join } from "node:path"
import { slugAt, textAt, type Value } from "@akasha/pages-system/page-value"
import type { Entry, Schema } from "../index-entries/index-entries.module.code.ts"
import { indexSchema } from "./index-schema.index.ts"

const SCHEMA = indexSchema.name

const ENDING = ".jsonl"

const PROPERTY = "page-property"

const SLUG = "slug"

export function schemaIn(value: Value): readonly Entry[] {
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (pageTypeSlug === null) return []
  const slug = textAt(value, "slug")
  if (slug === null) return []
  const propertySlug = textAt(value, "propertySlug")
  if (propertySlug === null) return []
  const held: Schema = {
    pageTypeSlug,
    targetPageTypeSlug: slugAt(value, "targetPageTypeSlug"),
    unique: slugAt(value, "unique"),
    slug,
    propertySlug,
    fileName: textAt(value, "fileName"),
  }
  return [
    {
      at: join(SCHEMA, PROPERTY, pageTypeSlug, SLUG, `${slug}${ENDING}`),
      line: JSON.stringify(held),
    },
  ]
}
