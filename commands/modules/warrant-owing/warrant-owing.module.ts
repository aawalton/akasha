import type { Module } from "@akasha/code/module"

export const warrantOwing = {
  id: "01a07bd4-e969-75ff-8616-768c59e748f6",
  pageTypeSlug: "module",
  slug: "warrant-owing",
  definition: "the readings a writer still owes for the paths a change touches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A writer owes a reading of every path that writer changes.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind saying the writer owes no reading is answered with nothing owed.",
    },
    {
      invariantKind: "departure",
      statement: "The body each path is left at is worked out before the warranting is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "An owing is worded by the warranting rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the repository.",
    },
    {
      invariantKind: "absence",
      statement: "Whether an owing refuses a call is the caller's own.",
    },
  ],
} as const satisfies Module
