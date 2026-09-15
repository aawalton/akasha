import { join } from "node:path"
import type {
  Entry,
  ScopedBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  entriesFor,
  type Filed,
  identifiedIn,
  lineFor,
  statedOf,
} from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import { indexPageProperty } from "akasha/page/index/page-property/index-page-property.index.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Identifying } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE_PROPERTY = indexPageProperty.name

const QUALIFIES = "/"

function slugIn(address: string): string {
  const at = address.lastIndexOf(QUALIFIES)
  return at === -1 ? address : address.slice(at + 1)
}

function scopesIn(
  scopedBy: ScopedBy | undefined,
  value: Value,
  pageTypeSlug: string
): readonly string[] {
  if (scopedBy === undefined) {
    throw new Error(`\`${pageTypeSlug}\` names no property a unique value of it is scoped by`)
  }
  const said = textAt(value, scopedBy.key)
  if (said === null) return []
  return [join(pageTypeSlug, scopedBy.pagePropertySlug, slugIn(said))]
}

export function filedByPageProperty(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Filed[] {
  const held = identifiedIn(value, identifying, only)
  if (held === null) return []
  const found: Filed[] = []
  for (const one of statedOf(held, PAGE_PROPERTY)) {
    for (const scope of scopesIn(one.scopedBy, value, held.pageTypeSlug)) {
      found.push({
        uniqueKind: PAGE_PROPERTY,
        scope,
        propertySlug: one.propertySlug,
        said: one.said,
      })
    }
  }
  return found
}

export function pagePropertyIn(
  value: Value,
  path: string,
  repo: string,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Entry[] {
  const line = lineFor(value, path, repo)
  return line === null ? [] : entriesFor(filedByPageProperty(value, identifying, only), line)
}
