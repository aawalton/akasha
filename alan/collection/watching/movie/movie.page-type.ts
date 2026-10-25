import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const movie = {
  id: "01a06599-ee09-7005-82e2-c1f83dc51c09",
  type: "page-type/page-type",
  slug: "movie",
  definition: "a story told in a sitting",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "movies" }],
  extends: ["page-type/collection-external"],
  parts: [],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/genres", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/imdb-id", required: false, many: false },
    { pageProperty: "text-property/poster-path", required: false, many: false },
    { pageProperty: "select-property/production-status", required: false, many: false },
    { pageProperty: "number-property/vote-average", required: false, many: false },
    { pageProperty: "text-property/streaming-on", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A film states the minutes the film runs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A film has no parts.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-10-25T19:20:15.125Z",
} as const satisfies PageType
