import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const mobilityStanding = {
  id: "01a0685d-cca7-77f0-a19b-11e24ae9f69e",
  pageTypeSlug: "module",
  slug: "mobility-standing",
  definition: "the standing of each mobility metric now and which way it has moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A metric read on each side counts as two, and one read on neither counts as one.",
    },
    {
      invariantKind: "departure",
      statement: "The latest reading of a metric is the one that says its standing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading stating no number counts toward how many readings there are and not toward the way it moved.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is stated as text, as a number, or as text and a number together.",
    },
    {
      invariantKind: "departure",
      statement:
        "The readings arrive oldest first, and the way a metric moved is read in that order.",
    },
  ],
} as const satisfies Module
