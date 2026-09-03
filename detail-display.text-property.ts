import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type DetailDisplay = string

export const detailDisplay = {
  id: "01a0683a-620a-7446-ae1d-032103346b3a",
  pageTypeSlug: "text-property",
  slug: "detail-display",
  propertySlug: "display",
  definition: "the layout a page type's pages are drawn in",
  max: 64,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A layout named here that no screen knows draws the plain layout.",
    },
  ],
} as const satisfies TextProperty
