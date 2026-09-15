import type { Filed } from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"

const PAGE_TYPE = "page-type"

export type InPageType = {
  readonly pageTypeSlug: Slug
  readonly propertySlug: Slug
  readonly value: string
  readonly scopePropertySlug?: never
}

export function filedInPageType(address: InPageType): Filed {
  return {
    uniqueKind: PAGE_TYPE,
    scope: address.pageTypeSlug,
    propertySlug: address.propertySlug,
    said: address.value,
  }
}
