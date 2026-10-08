import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatObservations = {
  id: "01a0680d-8b1a-7000-abf8-16f7ab595a99",
  type: "page-type/module",
  slug: "seat-observations",
  definition: "what each feature was last seen doing, and the key saying two readings differ",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change key leaves every timestamp out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys `at` and `worstAt` are the timestamps left out of a change key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change key sorts an object's keys rather than keeping the order those keys were set in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An array keeps its order in a change key.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which window wrote a reading.",
    },
  ],
  createdAt: "2026-09-03T16:15:13.178Z",
  updatedAt: "2026-09-15T18:33:01.000Z",
} as const satisfies Module
