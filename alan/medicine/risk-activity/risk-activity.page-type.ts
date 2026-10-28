import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const riskActivity = {
  id: "01a183bc-e759-73c8-991d-7117b5f7bcfb",
  type: "page-type/page-type",
  slug: "risk-activity",
  definition: "an activity the health model prices in disability-adjusted micromorts",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "risk activity" },
    { partOfSpeech: "part-of-speech/noun", spelling: "risk activities" },
  ],
  extends: ["page-type/page"],
  parts: [
    "text-property/exposure-unit",
    "number-property/micromorts-per-unit-low",
    "number-property/micromorts-per-unit-central",
    "number-property/micromorts-per-unit-high",
    "record-property/injury-disability",
    "text-property/injury-name",
    "number-property/injuries-per-million-units",
    "number-property/disability-years",
    "record-property/health-sources",
  ],
  properties: [
    { pageProperty: "text-property/exposure-unit", required: true, many: false },
    { pageProperty: "number-property/micromorts-per-unit-low", required: true, many: false },
    { pageProperty: "number-property/micromorts-per-unit-central", required: true, many: false },
    { pageProperty: "number-property/micromorts-per-unit-high", required: true, many: false },
    {
      pageProperty: "record-property/injury-disability",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "record-property/health-sources", required: false, many: true, maxCount: null },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T18:19:17.719Z",
  updatedAt: "2026-10-28T18:23:14.375Z",
} as const satisfies PageType
