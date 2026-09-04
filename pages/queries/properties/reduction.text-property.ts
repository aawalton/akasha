import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type Reduction = "sum" | "mean"

export const reduction = {
  id: "01a063ee-2a3b-7bb3-887a-95b643d06302",
  pageTypeSlug: "text-property",
  slug: "reduction",
  propertySlug: "reduction",
  definition: "how a query works the pages that passed down to one number",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query reducing names the key reduced.",
    },
    {
      invariantKind: "departure",
      statement: "A query stating no reduction answers with pages rather than a number.",
    },
  ],
} as const satisfies TextProperty
