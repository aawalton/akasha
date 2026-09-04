import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatObservations = {
  id: "01a0680d-8b1a-7000-abf8-16f7ab595a99",
  pageTypeSlug: "module",
  slug: "seat-observations",
  definition:
    "what each feature was last seen doing, with the writer that wrote it and the version it is in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record of another version is read as no record.",
    },
    {
      invariantKind: "departure",
      statement: "A record that does not parse is read as no record.",
    },
    {
      invariantKind: "departure",
      statement: "The writer is read off a record of any version.",
    },
    {
      invariantKind: "departure",
      statement: "A record naming no start time names a writer started at zero.",
    },
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
        "A change key sorts an object's keys rather than keeping the order they were set in.",
    },
    {
      invariantKind: "departure",
      statement: "An array keeps its order in a change key.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep paying the bound is one that left something never answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether a writer is still alive.",
    },
  ],
} as const satisfies Module
