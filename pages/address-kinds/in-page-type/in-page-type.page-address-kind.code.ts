import type { Slug } from "../../properties/slug.text-property.ts"

export type InPageType = {
  readonly pageTypeSlug: Slug
  readonly propertySlug: Slug
  readonly value: string
  readonly scopePropertySlug?: never
}

export function isInPageType(one: object): one is InPageType {
  return "pageTypeSlug" in one && !("scopeValue" in one)
}
