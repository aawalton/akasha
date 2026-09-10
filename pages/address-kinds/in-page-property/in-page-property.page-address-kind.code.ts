import { join } from "node:path"
import type { Filed } from "akasha/pages/indexes/identity/index-identity.index.code.ts"
import type { Slug } from "../../properties/slug.text-property.ts"

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
    scope: join(address.pageTypeSlug, address.scopePropertySlug, address.scopeValue),
    propertySlug: address.propertySlug,
    said: address.value,
  }
}
