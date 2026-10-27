import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { settledBy } from "akasha/story/world/mechanics/checks/properties/settled-by.relation-property.ts"
import { settling } from "akasha/story/world/mechanics/checks/properties/settling.module-property-group.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"

const CODE = "code"

const HELD_TS = "ts"

const SETTLED_BY = exportedAs(settledBy.propertySlug)

export function settlingFrom(
  at: string,
  value: Value | null,
  pathOf: (check: string) => string | null
): string | null {
  const named = value?.[SETTLED_BY]
  const from = typeof named === "string" ? pathOf(slugOf(named)) : at
  return from === null ? null : besideAt(from, `${settling.propertySlug}.${CODE}`, HELD_TS)
}

function checkAt(root: string, check: string): string | null {
  return listedAt(root, worldCheck.slug, check)[0]?.path ?? null
}

export function settlingFound(root: string, check: string): string | null {
  const at = checkAt(root, check)
  if (at === null) return null
  return settlingFrom(at, valueByPath(root, at), (named) => checkAt(root, named))
}
