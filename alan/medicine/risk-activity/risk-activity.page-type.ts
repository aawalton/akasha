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
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T18:19:17.719Z",
  updatedAt: "2026-10-28T18:19:17.719Z",
} as const satisfies PageType
