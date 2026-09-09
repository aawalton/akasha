import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatToggles = {
  id: "01a0686b-bfe9-7373-bdd9-fdc5b5f86ce5",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-toggles",
  definition: "the steps a run or a reset asks of a seat, and the line a terminal attaches by",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A running seat is stopped whatever place that seat has.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped interactive seat is resumed into a terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped headless seat is revived without a terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A reset attaches only where the seat has the interactive place.",
    },
    {
      invariantKind: "constraint",
      statement: "A name that is no seat name is refused rather than put in a command line.",
    },
    {
      invariantKind: "departure",
      statement: "A seat name is lower-case letters or digits or hyphens after a letter or digit.",
    },
    {
      invariantKind: "departure",
      statement: "A row's context value names whether the seat runs and where that seat is.",
    },
    {
      invariantKind: "departure",
      statement: "The notices are composed by the compose module rather than by a child process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here performs a step.",
    },
  ],
} as const satisfies Module
