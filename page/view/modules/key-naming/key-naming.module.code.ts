import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { namesAPropertyKey } from "akasha/page/type/page-property/properties/names-a-property-key.boolean-property.ts"
import { viewPageType } from "akasha/page/view/properties/view-page-type.relation-property.ts"
import { view } from "akasha/page/view/view.page-type.ts"

const MARKED = exportedAs(namesAPropertyKey.propertySlug)

const LISTED = exportedAs(viewPageType.propertySlug)

const PARTED_BY = "."

export type Keying = {
  readonly key: string
  readonly within: string | null
}

function marks(page: Value | null): boolean {
  return page !== null && page[MARKED] === true
}

export function viewKeying(index: Answering): readonly Keying[] {
  const found: Keying[] = []
  for (const one of index.propertiesOf(view.slug)) {
    const page = index.pageAt(one.pageTypeSlug, one.pagePropertySlug)
    if (page === null) continue
    if (marks(page)) {
      found.push({ key: one.key, within: null })
      continue
    }
    for (const field of index.carriedIn(page, one.pagePropertySlug)) {
      if (!marks(index.pageAt(field.pageTypeSlug, field.pagePropertySlug))) continue
      found.push({ key: one.key, within: field.key })
    }
  }
  return found
}

export function viewKinds(index: Answering): ReadonlySet<string> {
  return index.kindsUnder(view.slug)
}

export function listedBy(value: Value): string | null {
  return slugAt(value, LISTED)
}

export function headOf(key: string): string {
  const at = key.indexOf(PARTED_BY)
  return at === -1 ? key : key.slice(0, at)
}
