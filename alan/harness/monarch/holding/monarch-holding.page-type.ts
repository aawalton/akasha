import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const monarchHolding = {
  id: "01a0680a-1a00-7016-b283-5a9c7e1f1116",
  type: "page-type/page-type",
  slug: "monarch-holding",
  definition: "an investment an account holds",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "Monarch holding" },
    { partOfSpeech: "part-of-speech/noun", spelling: "Monarch holdings" },
  ],
  extends: ["page-type/monarch-record"],
  parts: [
    "number-property/cost-basis",
    "number-property/holding-value",
    "number-property/quantity",
    "relation-property/account",
    "text-property/security-name",
    "text-property/ticker",
  ],
  properties: [
    { pageProperty: "relation-property/account", required: true, many: false },
    { pageProperty: "text-property/security-name", required: true, many: false },
    { pageProperty: "text-property/ticker", required: true, many: false },
    { pageProperty: "number-property/quantity", required: true, many: false },
    { pageProperty: "number-property/cost-basis", required: true, many: false },
    { pageProperty: "number-property/holding-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Monarch reports a holding only for an account that says that account has holdings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding is three figures the daily sync rewrites.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding sits in memory.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:42:08.987Z",
} as const satisfies PageType
