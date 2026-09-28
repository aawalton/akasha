import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const stepStatus = {
  id: "01a0deac-97e0-7cd7-8396-354e0fe020ad",
  type: "page-type/page-type",
  slug: "step-status",
  definition: "whose move a turn or a written chapter being made waits on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "step status" },
    { partOfSpeech: "part-of-speech/noun", spelling: "step statuses" },
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
      statement: "A step status is named for whose move the turn or the chapter waits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step status's decisions say which status the turn or the chapter advances to.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
