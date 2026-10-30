import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const sync = {
  id: "01a06835-e289-7ad6-8588-3a59938a1140",
  type: "page-type/page-type",
  slug: "sync",
  definition: "a place outside akasha and the runs that import pages from the place",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "sync" }],
  extends: ["page-type/page"],
  parts: ["page-property-entry/sync-runs"],
  properties: [{ pageProperty: "page-property-entry/sync-runs", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sync runs one pull at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second pull starting says the first died without saying so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pull is in flight is rewritten on every start and finish.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The value with the pull in flight is never committed.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:59:17.001Z",
  updatedAt: "2026-10-30T15:11:31.551Z",
} as const satisfies PageType
