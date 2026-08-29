import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"
import type { Many } from "./many.page-property-type.ts"
import type { PagePropertyTypeSlug } from "./page-property-type-slug.page-property-type.ts"
import type { Required } from "./required.page-property-type.ts"

export type Declaration = {
  propertySlug: PagePropertyTypeSlug
  required: Required
  many: Many
}

export const declaration = {
  id: "01a04df3-6848-71ec-beb8-76e999dccbb5",
  pageTypeSlug: "page-property-type",
  slug: "declaration",
  definition: "one property a page type carries, and how it carries it",
  extendsSlug: null,
  kind: "record",
  design: [
    {
      invariantKind: "departure",
      statement: "What a property is belongs to the property, how it is carried belongs here.",
    },
  ],
} as const satisfies PagePropertyType
