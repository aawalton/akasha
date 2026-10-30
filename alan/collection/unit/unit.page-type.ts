import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const unit = {
  id: "01a063de-2c60-7014-9620-56bbc19efcd1",
  type: "page-type/page-type",
  slug: "unit",
  definition: "what a length is counted in",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "unit" },
    { partOfSpeech: "part-of-speech/noun", spelling: "units" },
  ],
  parts: ["number-property/words", "unit/hours", "unit/minutes", "unit/seconds", "unit/words"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "number-property/words", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit says its worth in words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words are the unit every other unit is weighed against.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-10-30T15:50:47.500Z",
} as const satisfies PageType
