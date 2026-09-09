import type { Module } from "@akasha/code/module"

export const inboxCountTick = {
  id: "01a069b6-bb6b-78fc-af80-801cc2257f72",
  pageTypeSlug: "module",
  type: "module",
  slug: "inbox-count-tick",
  definition: "one poll of every inbox and one write of what it found, and then the run is over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick is a single poll and a single write.",
    },
    {
      invariantKind: "departure",
      statement: "The day polled and the day written are a single ESO day settled once.",
    },
    {
      invariantKind: "departure",
      statement: "Every inbox that answered nothing is named among the failures the run reports.",
    },
    {
      invariantKind: "departure",
      statement: "A run in which a source failed still ends well.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits or loops.",
    },
  ],
} as const satisfies Module
