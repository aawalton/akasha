import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const indexName = {
  id: "01a04ef3-160f-7845-bc55-4507fdef6109",
  type: "text-property",
  slug: "index-name",
  propertySlug: "name",
  definition: "the name an index's answers are filed under",
  maxLength: 30,
  nameFormat: "name-format/lower-kebab-case",
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
  types: "ts",
} as const satisfies TextProperty
