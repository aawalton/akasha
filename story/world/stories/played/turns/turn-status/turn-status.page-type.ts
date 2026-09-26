import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const turnStatus = {
  id: "01a0deac-97e0-7cd7-8396-354e0fe020ad",
  type: "page-type/page-type",
  slug: "turn-status",
  definition: "whose move a played turn waits on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "turn status" },
    { partOfSpeech: "part-of-speech/noun", spelling: "turn statuses" },
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "record-property/decisions", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn status is named for whose move the turn waits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn status's decisions say which status the turn advances to.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
