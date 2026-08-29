import { join } from "node:path"
import {
  type Entry,
  type Schema,
  slugAt,
  textAt,
  type Value,
} from "../../index-entries/index-entries.module.code.ts"
import { indexSchema } from "./index-schema.index.ts"

const SCHEMA = indexSchema.indexName

const ENDING = ".jsonl"

const PROPERTY = "page-property"

const SHAPES = new Set([
  "text-property",
  "number-property",
  "boolean-property",
  "relation-property",
  "record-property",
  "file-property",
])

export function schemaIn(value: Value): readonly Entry[] {
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (pageTypeSlug === null || !SHAPES.has(pageTypeSlug)) return []
  const slug = textAt(value, "slug")
  if (slug === null) return []
  const held: Schema = {
    pageTypeSlug,
    targetPageTypeSlug: slugAt(value, "targetPageTypeSlug"),
    unique: slugAt(value, "unique"),
  }
  return [{ at: join(SCHEMA, PROPERTY, "slug", `${slug}${ENDING}`), line: JSON.stringify(held) }]
}
