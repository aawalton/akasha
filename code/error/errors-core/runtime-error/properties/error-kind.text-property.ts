import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const errorKind = {
  id: "01a05f3f-e3e0-70ed-a9ac-229acd8e154c",
  type: "page-type/text-property",
  slug: "error-kind",
  propertySlug: "kind",
  definition: "the way a client came to meet an error",
  maxLength: 32,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kinds a report may have are named by the report shape.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The kinds are restated nowhere here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T23:13:37.760Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies TextProperty
