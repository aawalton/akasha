import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const safetyLevel = {
  id: "01a05fd8-c30f-757c-bda6-861e73844e8b",
  type: "page-type/text-property",
  slug: "safety-level",
  propertySlug: "safety-level",
  definition: "how safe Alan feels",
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
      statement: "A safety level carries forward from the prior tracked session.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T17:47:23.608Z",
} as const satisfies TextProperty
