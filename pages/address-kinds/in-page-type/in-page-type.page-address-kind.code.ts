import type { Filed } from "akasha/pages/indexes/identity/index-identity.index.code.ts"
import type { Slug } from "../../properties/slug.text-property.types.ts"

const PAGE_TYPE = "page-type"

export type InPageType = {
  readonly pageTypeSlug: Slug
  readonly propertySlug: Slug
  readonly value: string
  readonly scopePropertySlug?: never
}

export function isInPageType(one: object): one is InPageType {
  return "pageTypeSlug" in one && !("scopeValue" in one)
}

export function filedInPageType(address: InPageType): Filed {
  return {
    uniqueKind: PAGE_TYPE,
    scope: address.pageTypeSlug,
    propertySlug: address.propertySlug,
    said: address.value,
  }
}
