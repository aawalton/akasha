import type { Slug } from "../../properties/slug.text-property.ts"

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
