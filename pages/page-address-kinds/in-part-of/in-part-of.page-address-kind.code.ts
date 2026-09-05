import type { Slug } from "../../properties/slug.text-property.ts"
import type { ById } from "../by-id/by-id.page-address-kind.code.ts"
import type { InPageType } from "../in-page-type/in-page-type.page-address-kind.code.ts"

export type InPartOf = {
  readonly pageTypeSlug: Slug
  readonly partOf: ById | InPageType | InPartOf
  readonly propertySlug: Slug
  readonly value: string
}

export function isInPartOf(one: object): one is InPartOf {
  return "partOf" in one
}
