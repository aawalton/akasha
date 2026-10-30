import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const monarchRecord = {
  id: "01a0680a-1a00-7001-b8f4-2c9e5a7b1102",
  type: "page-type/page-type",
  slug: "monarch-record",
  definition: "a thing Monarch keeps about the household's money",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Monarch record" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Monarch records" },
  ],
  extends: ["page-type/page"],
  parts: ["text-property/monarch-id"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/monarch-id", required: false, many: false },
    {
      pageProperty: "standard-agent-english-property/definition",
      required: false,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record is the household's copy of the record Monarch holds rather than the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record Monarch renames keeps its slug and takes the new title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A daily sync rewrites a record's figures and no instruction names the figures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is written as Monarch writes the title.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:37:27.543Z",
} as const satisfies PageType
