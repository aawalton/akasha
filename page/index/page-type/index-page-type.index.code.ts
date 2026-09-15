import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  entriesFor,
  type Filed,
  identifiedIn,
  lineFor,
  statedOf,
} from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import { indexPageType } from "akasha/page/index/page-type/index-page-type.index.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Identifying } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE_TYPE = indexPageType.name

export function filedByPageType(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Filed[] {
  const held = identifiedIn(value, identifying, only)
  if (held === null) return []
  return statedOf(held, PAGE_TYPE).map((one) => ({
    uniqueKind: PAGE_TYPE,
    scope: held.pageTypeSlug,
    propertySlug: one.propertySlug,
    said: one.said,
  }))
}

export function pageTypeIn(
  value: Value,
  path: string,
  repo: string,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Entry[] {
  const line = lineFor(value, path, repo)
  return line === null ? [] : entriesFor(filedByPageType(value, identifying, only), line)
}
