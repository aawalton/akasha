import type { Slug } from "../../properties/slug.text-property.ts"

export type InPageType = {
  readonly pageTypeSlug: Slug
  readonly propertySlug: Slug
  readonly value: string
  readonly partOf?: never
}

export function isInPageType(one: object): one is InPageType {
  return "pageTypeSlug" in one && !("partOf" in one)
}
