import type { Module } from "../../code-system/module/module.page-type.ts"

export const standing = {
  id: "01a04faa-e70a-757d-a665-8e7b7bcfd14d",
  pageTypeSlug: "module",
  slug: "standing",
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
      statement: "A body is weighed by git's own object id, never by when it was last touched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body carried mechanically since it was read still stands for the reader it was carried for.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose body will not read at all counts as moved, never as standing.",
    },
    {
      invariantKind: "absence",
      statement:
        "A path no reading was recorded for is held to nothing, because nothing was read to hold it to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change commits only where no commit reaching `akasha/` landed since it read its base.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit reaching nothing under `akasha/` can change no verdict, so it is no reason to refuse.",
    },
    {
      invariantKind: "departure",
      statement:
        "What reached `akasha/` between two commits, where it will not read at all, is taken as having reached it.",
    },
  ],
} as const satisfies Module
