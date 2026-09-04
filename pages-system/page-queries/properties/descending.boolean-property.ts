import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type Descending = boolean

export const descending = {
  id: "01a063ee-2a3b-7203-b639-871e40a95aca",
  pageTypeSlug: "boolean-property",
  slug: "descending",
  propertySlug: "descending",
  definition: "whether a query orders its answer from greatest to least",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query ordering by no key is unmoved by descending.",
    },
  ],
} as const satisfies BooleanProperty
