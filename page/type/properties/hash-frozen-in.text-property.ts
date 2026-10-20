import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const hashFrozenIn = {
  id: "01a156d6-6aa8-7bf0-8159-a65d00196b6b",
  type: "page-type/text-property",
  slug: "hash-frozen-in",
  propertySlug: "hash-frozen-in",
  definition: "a table in code holding the places a shipped codec minor reads this table by",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is the code file's path, a space, and the constant declared in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A frozen table holds each entry at the index every older codec minor reads it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table naming no frozen table keeps every entry in its place.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T01:04:15.015Z",
  updatedAt: "2026-10-20T01:04:15.015Z",
} as const satisfies TextProperty
