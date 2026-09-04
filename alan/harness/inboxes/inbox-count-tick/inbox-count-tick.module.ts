import type { Module } from "@akasha/code-system/module"

export const inboxCountTick = {
  id: "01a069b6-bb6b-78fc-af80-801cc2257f72",
  pageTypeSlug: "module",
  slug: "inbox-count-tick",
  definition: "one poll of every inbox and one write of what it found, and then the run is over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One tick is one poll and one write.",
    },
    {
      invariantKind: "departure",
      statement: "The day polled and the day written are one ESO day settled once.",
    },
    {
      invariantKind: "departure",
      statement: "Every inbox that answered nothing is named among what the run reports as failed.",
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
