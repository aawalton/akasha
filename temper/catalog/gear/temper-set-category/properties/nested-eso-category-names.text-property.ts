import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const nestedEsoCategoryNames = {
  id: "01a0e11d-90b4-72c5-9b70-1bdf2a0c4bac",
  type: "page-type/text-property",
  slug: "nested-eso-category-names",
  propertySlug: "nested-eso-category-names",
  definition: "an ESO category name whose own subcategories are kept together under that name",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is one of the ESO category names the same page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its sets are grouped under it by subcategory rather than spread among the rest.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
