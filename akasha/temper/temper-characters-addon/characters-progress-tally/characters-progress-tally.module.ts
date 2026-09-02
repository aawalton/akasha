import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersProgressTally = {
  id: "01a062ee-eff1-7066-8ae2-e9910475597e",
  pageTypeSlug: "module",
  slug: "characters-progress-tally",
  definition:
    "how many of a record's entries are done out of all of them, at the depth a path names",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Counting done entries against all of them is written once.",
    },
  ],
} as const satisfies Module
