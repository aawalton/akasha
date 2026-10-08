import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const indexName = {
  id: "01a04ef3-160f-7845-bc55-4507fdef6109",
  type: "page-type/text-property",
  slug: "index-name",
  propertySlug: "name",
  definition: "the name of an index's filed answers",
  maxLength: 30,
  nameFormat: "name-format/lower-kebab-case",
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "No two indexes share a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name is the folder the answers stand in.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-29T19:15:48.879Z",
  updatedAt: "2026-09-22T13:59:20.000Z",
} as const satisfies TextProperty
