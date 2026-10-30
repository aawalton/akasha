import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const safetyLevel = {
  id: "01a05fd8-c30f-757c-bda6-861e73844e8b",
  type: "page-type/text-property",
  slug: "safety-level",
  propertySlug: "safety-level",
  definition: "how safe Alan was over a stretch of time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "safety level" },
    { partOfSpeech: "part-of-speech/noun", spelling: "safety levels" },
  ],
  maxLength: 3,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A safety level is taken as a number and is written as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A safety level carries forward from the prior stretch of time.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T16:26:39.688Z",
} as const satisfies TextProperty
