import type { Module } from "../../../../../../code-system/modules/module.page-type.ts"

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
      statement: "A metric read on each side counts as two metrics.",
    },
    {
      invariantKind: "departure",
      statement: "A metric read on neither side counts as one metric.",
    },
    {
      invariantKind: "departure",
      statement: "The latest reading of a metric is the reading that says the metric's standing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading stating no number counts toward the reading count and not toward the way the metric moved.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is stated as text or as a number or as text and a number together.",
    },
    {
      invariantKind: "departure",
      statement: "The readings arrive oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "The way a metric moved is read in the order the readings arrive.",
    },
  ],
} as const satisfies Module
