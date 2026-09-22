import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const season = {
  id: "01a06599-ee09-7003-a52a-e6a01a72f7da",
  type: "page-type/page-type",
  slug: "season",
  definition: "a run of a show's episodes",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "season" },
    { partOfSpeech: "part-of-speech/noun", spelling: "seasons" },
  ],
  extends: ["page-type/collection-external"],
  parts: [],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/poster-path", required: false, many: false },
    { pageProperty: "number-property/vote-average", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The season numbered zero has the episodes sitting outside the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season's length is summed from its episodes rather than stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season's number is its position among the seasons of its show.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
