import type { TextProperty } from "../../../page-property/text-property.page-type.ts"

export type IndexName = string

export const indexName = {
  id: "01a04ef3-160f-7845-bc55-4507fdef6109",
  pageTypeSlug: "text-property",
  slug: "index-name",
  definition: "the name an index's answers are filed under",
  max: 30,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "No two indexes share a name.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name is the folder the answers stand in, so reading it is how a caller reaches them.",
    },
  ],
} as const satisfies TextProperty
