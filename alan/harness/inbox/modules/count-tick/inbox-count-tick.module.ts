import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxCountTick = {
  id: "01a069b6-bb6b-78fc-af80-801cc2257f72",
  type: "page-type/module",
  slug: "inbox-count-tick",
  definition: "a run that writes how many things wait in each inbox",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick is a single poll and a single write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day polled and the day written are a single ESO day settled once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every inbox that answered nothing is named among the failures the run reports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run in which a source failed still ends well.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits or loops.",
    },
  ],
  createdAt: "2026-09-03T23:59:38.347Z",
  updatedAt: "2026-10-30T15:30:30.994Z",
} as const satisfies Module
