import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxCountTick = {
  id: "01a069b6-bb6b-78fc-af80-801cc2257f72",
  type: "page-type/module",
  slug: "inbox-count-tick",
  definition: "one poll of every inbox and one write of what it found, and then the run is over",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick is a single poll and a single write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day polled and the day written are a single ESO day settled once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every inbox that answered nothing is named among the failures the run reports.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run in which a source failed still ends well.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits or loops.",
    },
  ],
} as const satisfies Module
