import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersProgressTally = {
  id: "01a062ee-eff1-7066-8ae2-e9910475597e",
  type: "page-type/module",
  slug: "characters-progress-tally",
  definition:
    "how many of a record's entries are done out of all of them, at the depth a path names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Counting done entries against all the entries is written once.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.297Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
