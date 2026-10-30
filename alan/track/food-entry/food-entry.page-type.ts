import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const foodEntry = {
  id: "01a065a3-6e8b-7516-be17-9b2737f11128",
  type: "page-type/page-type",
  slug: "food-entry",
  definition: "something Alan has eaten",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "food entry" },
    { partOfSpeech: "part-of-speech/noun", spelling: "food entries" },
  ],
  extends: ["page-type/page"],
  parts: [
    "file-property/food-entry-note",
    "instant-property/happened-at",
    "number-property/estimated-calories",
    "number-property/plant-grams",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "instant-property/happened-at", required: true, many: false },
    { pageProperty: "number-property/plant-grams", required: false, many: false },
    { pageProperty: "number-property/estimated-calories", required: false, many: false },
    { pageProperty: "file-property/food-entry-note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One file has one thing eaten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The day a food entry counts to is worked out from the instant that entry happened at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A food entry that contributes no plants has no plant grams rather than a zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every food entry Alan logs lands in a file.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T05:00:04.619Z",
  updatedAt: "2026-10-30T16:49:41.470Z",
} as const satisfies PageType
