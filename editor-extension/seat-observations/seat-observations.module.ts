import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatObservations = {
  id: "01a0680d-8b1a-7000-abf8-16f7ab595a99",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-observations",
  definition: "what each feature was last seen doing, and the key saying two readings differ",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change key leaves every timestamp out.",
    },
    {
      invariantKind: "departure",
      statement: "The keys `at` and `worstAt` are the timestamps left out of a change key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change key sorts an object's keys rather than keeping the order those keys were set in.",
    },
    {
      invariantKind: "departure",
      statement: "An array keeps its order in a change key.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which window wrote a reading.",
    },
  ],
} as const satisfies Module
