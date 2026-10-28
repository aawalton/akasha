import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const causeOfDeath = {
  id: "01a183bc-e758-7df8-8861-f179dcfa60a1",
  type: "page-type/page-type",
  slug: "cause-of-death",
  definition: "a cause of death the health model weighs for Alan",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "cause of death" },
    { partOfSpeech: "part-of-speech/noun", spelling: "causes of death" },
  ],
  extends: ["page-type/page"],
  parts: [
    "text-property/icd10-codes",
    "record-property/baseline-rates",
    "number-property/age-band-start",
    "number-property/age-band-end",
    "number-property/deaths-per-hundred-thousand",
    "record-property/risk-factors",
    "text-property/risk-factor-name",
    "text-property/risk-factor-person-property",
    "text-property/risk-factor-applied-as",
    "number-property/relative-risk-low",
    "number-property/relative-risk-central",
    "number-property/relative-risk-high",
    "number-property/disability-years-before-death",
    "number-property/disability-weight",
    "text-property/health-source-citation",
    "url-property/health-source-url",
  ],
  properties: [
    { pageProperty: "text-property/icd10-codes", required: false, many: true, maxCount: null },
    {
      pageProperty: "record-property/baseline-rates",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "record-property/risk-factors", required: false, many: true, maxCount: null },
    {
      pageProperty: "number-property/disability-years-before-death",
      required: false,
      many: false,
    },
    { pageProperty: "number-property/disability-weight", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cause of death's disability weight is for the years lived disabled before it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T18:19:17.719Z",
  updatedAt: "2026-10-28T18:22:21.854Z",
} as const satisfies PageType
