import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  entriesFor,
  type Filed,
  identifiedIn,
  lineFor,
  statedOf,
} from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import { indexPage } from "akasha/page/index/page/index-page.index.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Identifying } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE = indexPage.name

const NO_SCOPE = ""

export function filedByPage(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Filed[] {
  const held = identifiedIn(value, identifying, only)
  if (held === null) return []
  return statedOf(held, PAGE).map((one) => ({
    uniqueKind: PAGE,
    scope: NO_SCOPE,
    propertySlug: one.propertySlug,
    said: one.said,
  }))
}

export function pageIn(
  value: Value,
  path: string,
  repo: string,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Entry[] {
  const line = lineFor(value, path, repo)
  return line === null ? [] : entriesFor(filedByPage(value, identifying, only), line)
}
