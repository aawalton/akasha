import type { PageAddress } from "../../address/page-address.module.code.ts"
import type { Slug } from "../../properties/slug.text-property.ts"

export type InPartOf = {
  readonly pageTypeSlug: Slug
  readonly partOf: PageAddress
  readonly propertySlug: Slug
  readonly value: string
}

export function isInPartOf(one: object): one is InPartOf {
  return "partOf" in one
}
