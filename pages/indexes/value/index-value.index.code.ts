import { join } from "node:path"
import { textAt, type Value } from "@akasha/pages-system/page-value"
import { type Entry, under } from "../index-entries/index-entries.module.code.ts"
import { indexValue } from "./index-value.index.ts"

const VALUE = indexValue.name

const ENDING = ".jsonl"

const PAGE_TYPE_SLUG = "pageTypeSlug"

export type Valued = {
  readonly path: string
  readonly value: Value
}

export function fileFor(pageTypeSlug: string): string {
  return join(VALUE, `${pageTypeSlug}${ENDING}`)
}

export function valuedIn(line: string): Valued | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = said as Record<string, unknown>
  const path = held.path
  const value = held.value
  if (typeof path !== "string") return null
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  return { path, value: value as Value }
}

export function valueIn(value: Value, path: string, repo: string): readonly Entry[] {
  const pageTypeSlug = textAt(value, PAGE_TYPE_SLUG)
  if (pageTypeSlug === null) return []
  return [
    {
      at: fileFor(pageTypeSlug),
      line: JSON.stringify({ path: under(repo, path), value }),
    },
  ]
}
