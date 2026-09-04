import type { Module } from "../../code-system/modules/module.page-type.ts"

export const zonedTime = {
  id: "01a05c22-7bc9-7000-a354-10e39d5cdc0b",
  pageTypeSlug: "module",
  slug: "zoned-time",
  definition: "a wall clock reading in a named zone turned into the instant it names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The offset is settled by asking the zone twice.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that is no date is answered as nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A date of all zeroes is how the feed spells no date.",
    },
  ],
} as const satisfies Module
