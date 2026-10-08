import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const modelId = {
  id: "01a0d4b7-a4c5-7084-a641-ef2f0894a8b9",
  type: "page-type/text-property",
  slug: "model-id",
  propertySlug: "model-id",
  definition: "the id a program uses for a model version",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The id is Claude Code's own, with any context window it appends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No two model versions state one id.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T18:40:00.197Z",
  updatedAt: "2026-09-25T17:51:40.000Z",
} as const satisfies TextProperty
