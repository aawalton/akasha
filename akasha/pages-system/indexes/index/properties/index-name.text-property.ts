import type { TextProperty } from "../../../text-property/text-property.page-type.ts"

export type IndexName = string

export const indexName = {
  id: "01a04ef3-160f-7845-bc55-4507fdef6109",
  pageTypeSlug: "text-property",
  slug: "index-name",
  propertySlug: "index-name",
  definition: "the name an index's answers are filed under",
  max: 30,
  nameFormatSlug: "name-format/lower-kebab-case",
  unique: "page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "No two indexes share a name.",
    },
    {
      invariantKind: "departure",
      statement: "The name is the folder the answers stand in.",
    },
  ],
} as const satisfies TextProperty
