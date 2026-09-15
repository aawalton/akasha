import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  type Filed,
  identifiedIn,
} from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import { indexPage } from "akasha/page/index/page/index-page.index.ts"
import { filedByPage, pageIn } from "akasha/page/index/page/index-page.index.code.ts"
import { indexPageProperty } from "akasha/page/index/page-property/index-page-property.index.ts"
import {
  filedByPageProperty,
  pagePropertyIn,
} from "akasha/page/index/page-property/index-page-property.index.code.ts"
import { indexPageType } from "akasha/page/index/page-type/index-page-type.index.ts"
import {
  filedByPageType,
  pageTypeIn,
} from "akasha/page/index/page-type/index-page-type.index.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Identifying } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const IDENTITIES: readonly string[] = [
  indexPage.name,
  indexPageType.name,
  indexPageProperty.name,
]

function refusingUnknown(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null
): undefined {
  const held = identifiedIn(value, identifying, only)
  for (const one of held?.stated ?? []) {
    if (IDENTITIES.includes(one.uniqueKind)) continue
    throw new Error(`\`${one.uniqueKind}\` is no unique kind a page is filed under`)
  }
}

export function filedIn(
  value: Value,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Filed[] {
  refusingUnknown(value, identifying, only)
  return [
    ...filedByPage(value, identifying, only),
    ...filedByPageType(value, identifying, only),
    ...filedByPageProperty(value, identifying, only),
  ]
}

export function identitiesIn(
  value: Value,
  path: string,
  repo: string,
  identifying: Identifying,
  only: ReadonlySet<string> | null = null
): readonly Entry[] {
  refusingUnknown(value, identifying, only)
  return [
    ...pageIn(value, path, repo, identifying, only),
    ...pageTypeIn(value, path, repo, identifying, only),
    ...pagePropertyIn(value, path, repo, identifying, only),
  ]
}
