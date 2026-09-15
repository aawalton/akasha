import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const decideLongtail = {
  id: "01a06863-74e4-72ed-9169-700d492e6ad5",
  type: "module",
  slug: "decide-longtail",
  definition: "what the slower store is to have and what it is to let go of",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit is one monthly anchor with the write-ahead log its own range covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The month a run falls in has a provisional unit until that month is over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A partial write-ahead log segment is never part of a unit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here touches either store.",
    },
  ],
} as const satisfies Module
