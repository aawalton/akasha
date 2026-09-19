import { join } from "node:path"
import type {
  Entry,
  ScopedBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { bucketOf } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Identifying } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const ENDING = ".jsonl"

export type Filed = {
  readonly uniqueKind: string
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function keyFor(one: Filed): string {
  return join(one.uniqueKind, one.scope, one.propertySlug, one.said)
}

function keysFor(one: Filed): readonly string[] {
  const bucket = bucketOf(one.said)
  const flat = keyFor(one)
  if (bucket === null) return [flat]
  return [join(one.uniqueKind, one.scope, one.propertySlug, bucket, one.said), flat]
}

export type Stated = {
  readonly propertySlug: string
  readonly uniqueKind: string
  readonly scopedBy: ScopedBy | undefined
  readonly said: string
}

export type Identified = {
  readonly pageTypeSlug: string
  readonly stated: readonly Stated[]
}

export function identifiedIn(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): Identified | null {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = slugAt(value, "type") ?? slugAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return null
  const stated: Stated[] = []
  for (const [propertySlug, one] of identifying(pageTypeSlug)) {
    if (only !== null && !only.has(propertySlug)) continue
    const found = value[one.key]
    if (typeof found !== "string" && typeof found !== "number") continue
    stated.push({
      propertySlug,
      uniqueKind: one.uniqueKind,
      scopedBy: one.scopedBy,
      said: String(found),
    })
  }
  return { pageTypeSlug, stated }
}

export function statedOf(held: Identified, uniqueKind: string): readonly Stated[] {
  return held.stated.filter((one) => one.uniqueKind === uniqueKind)
}

export function lineFor(value: Value, path: string, repo: string): string | null {
  const id = textAt(value, "id")
  return id === null ? null : JSON.stringify({ path: under(repo, path), id })
}

export function entriesFor(filed: readonly Filed[], line: string): readonly Entry[] {
  return filed.flatMap((one) => keysFor(one).map((at) => ({ at: `${at}${ENDING}`, line })))
}
