import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatObservations = {
  id: "01a0680d-8b1a-7000-abf8-16f7ab595a99",
  type: "module",
  slug: "seat-observations",
  definition: "what each feature was last seen doing, and the key saying two readings differ",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change key leaves every timestamp out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys `at` and `worstAt` are the timestamps left out of a change key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change key sorts an object's keys rather than keeping the order those keys were set in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An array keeps its order in a change key.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows which window wrote a reading.",
    },
  ],
} as const satisfies Module
