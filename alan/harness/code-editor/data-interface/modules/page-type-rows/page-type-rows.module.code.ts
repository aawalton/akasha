import type { QueryRow } from "akasha/alan/harness/code-editor/data-interface/modules/page-tree-assemble/page-tree-assemble.module.code.ts"
import {
  readingIn,
  type Valued,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { AKASHA } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  slugsIn,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extends"

const NO_PARENT = null

export function typeRowsFrom(pageTypes: readonly Valued[]): readonly QueryRow[] {
  const rows: QueryRow[] = []
  for (const one of pageTypes) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    const at = `${AKASHA}:${one.path}`
    const above = slugsIn(one.value[EXTENDS])
    if (above.length === 0) {
      rows.push({ at, values: { slug, "extends-slug": NO_PARENT } })
      continue
    }
    for (const parent of above) rows.push({ at, values: { slug, "extends-slug": parent } })
  }
  return rows
}

export function pageTypeRows(given: string | Reading): readonly QueryRow[] {
  return typeRowsFrom(valuesOfType(readingIn(given), PAGE_TYPE))
}
