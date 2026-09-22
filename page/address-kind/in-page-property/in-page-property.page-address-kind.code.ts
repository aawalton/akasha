import type { Filed } from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"

const PAGE_PROPERTY = "page-property"

export type InPageProperty = {
  readonly pageTypeSlug: Slug
  readonly scopePropertySlug: Slug
  readonly scopeValue: string
  readonly propertySlug: Slug
  readonly value: string
}

export function isInPageProperty(one: object): one is InPageProperty {
  return "scopeValue" in one
}

export function filedInPageProperty(address: InPageProperty): Filed {
  return {
    uniqueKind: PAGE_PROPERTY,
    scope: `${address.pageTypeSlug}/${address.scopePropertySlug}/${address.scopeValue}`,
    propertySlug: address.propertySlug,
    said: address.value,
  }
}
