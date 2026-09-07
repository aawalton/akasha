import type { PageAddress } from "../../address/page-address.module.code.ts"
import type { Slug } from "../../properties/slug.text-property.ts"

export type InPageProperty = {
  readonly pageTypeSlug: Slug
  readonly partOf: PageAddress
  readonly propertySlug: Slug
  readonly value: string
}

export function isInPageProperty(one: object): one is InPageProperty {
  return "partOf" in one
}
