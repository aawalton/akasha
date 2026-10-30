import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingField = {
  id: "01a06827-ec0c-79f7-864d-da0cf491975e",
  type: "page-type/page-type",
  slug: "tracking-field",
  definition: "a property that takes a new value when that property of Alan is observed",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tracking field" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tracking fields" },
  ],
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field is observed rather than set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each value a field has is one observation.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "No property here declares the capture a field names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-09-03T16:44:01.932Z",
  updatedAt: "2026-10-30T16:49:06.440Z",
} as const satisfies PageType
