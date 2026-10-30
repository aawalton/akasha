import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const carModel = {
  id: "01a0659a-4bc5-745f-bbb3-18171fb52343",
  type: "page-type/page-type",
  slug: "car-model",
  definition: "a nameplate a make builds",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "car model" },
    { partOfSpeech: "part-of-speech/noun", spelling: "car models" },
  ],
  extends: ["page-type/car"],
  parts: [
    "relation-property/car-make",
    "text-property/body-style",
    "text-property/generation",
    "text-property/model-years-available",
    "text-property/overview",
    "text-property/powertrain-options",
    "text-property/segment",
  ],
  properties: [
    { pageProperty: "text-property/body-style", required: true, many: false },
    { pageProperty: "text-property/generation", required: true, many: false },
    { pageProperty: "text-property/model-years-available", required: true, many: false },
    { pageProperty: "text-property/overview", required: true, many: false },
    {
      pageProperty: "text-property/powertrain-options",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/segment", required: true, many: false },
    { pageProperty: "relation-property/car-make", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A model names the make above that model and never the years below.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:50:05.893Z",
  updatedAt: "2026-10-30T14:38:05.599Z",
} as const satisfies PageType
