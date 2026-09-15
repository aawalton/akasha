import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const indexName = {
  id: "01a04ef3-160f-7845-bc55-4507fdef6109",
  type: "page-type/text-property",
  slug: "index-name",
  propertySlug: "name",
  definition: "the name an index's answers are filed under",
  maxLength: 30,
  nameFormat: "name-format/lower-kebab-case",
  unique: "unique-kind/page-type",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "No two indexes share a name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is the folder the answers stand in.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
