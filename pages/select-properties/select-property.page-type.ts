import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { SelectValues } from "./properties/select-values.text-property.ts"

export type SelectProperty = PageProperty & {
  values: SelectValues
}

export const selectProperty = {
  id: "01a063de-2c60-7003-a9bc-92d52325a70d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "select-property",
  definition: "a page property with one of a set of values the property states",
  pluralSlug: "select-properties",
  parts: ["text-property/select-values"],
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "text-property/select-values", required: true, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A select property states its values as page data.",
    },
    {
      invariantKind: "departure",
      statement: "A select property's file exports the union of the values the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A value outside the set is refused rather than kept as text.",
    },
    {
      invariantKind: "absence",
      statement: "A text property with a hand-written union is no select property.",
    },
  ],
} as const satisfies PageType
