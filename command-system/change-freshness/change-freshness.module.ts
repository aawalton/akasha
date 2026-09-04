import type { Module } from "@akasha/code-system/module"

export const changeFreshness = {
  id: "01a04faa-e70a-757d-a665-8e7b7bcfd14d",
  pageTypeSlug: "module",
  slug: "change-freshness",
  definition:
    "the rules holding a change to the bodies its writer read and to the commit it was judged against",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body is overwritten only where what stands on disk is the body its writer read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is weighed by git's own object id rather than by when that body was last touched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body carried mechanically after it was read still stands for the reader it was carried for.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose body will not read at all counts as moved rather than as standing.",
    },
    {
      invariantKind: "absence",
      statement: "A path no reading was recorded for is held to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A commit reaching nothing this repository holds can change no verdict.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that changed between two commits and will not read is taken as having changed.",
    },
  ],
} as const satisfies Module
