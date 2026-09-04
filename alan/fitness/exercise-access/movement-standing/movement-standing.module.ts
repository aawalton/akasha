import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const movementStanding = {
  id: "01a0685d-cca7-717c-9288-578ad8f3bbb4",
  pageTypeSlug: "module",
  slug: "movement-standing",
  definition: "which movements the recent sessions held, and where each one stands across its sets",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement is named once however many of its sets stand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A movement is read in the order its first set was met rather than alphabetically.",
    },
    {
      invariantKind: "departure",
      statement: "A movement with no exercise page behind it is named by its slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A set carries the day of the session it was logged in rather than a day of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A set whose session cannot be found carries no day rather than today's.",
    },
    {
      invariantKind: "gap",
      statement: "A set states no time it was logged, so its sets are ordered by their names.",
    },
  ],
} as const satisfies Module
