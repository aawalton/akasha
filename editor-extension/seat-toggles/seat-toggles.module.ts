import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatToggles = {
  id: "01a0686b-bfe9-7373-bdd9-fdc5b5f86ce5",
  pageTypeSlug: "module",
  slug: "seat-toggles",
  definition: "the steps a run or a reset asks of a seat, and the line a terminal attaches by",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A running seat is stopped whatever place it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped interactive seat is resumed into a terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped headless seat is revived without one.",
    },
    {
      invariantKind: "departure",
      statement: "A reset attaches only where the seat holds the interactive place.",
    },
    {
      invariantKind: "constraint",
      statement: "A name that is no seat name is refused rather than put in a command line.",
    },
    {
      invariantKind: "departure",
      statement: "A seat name is lower-case letters, digits and hyphens after a letter or digit.",
    },
    {
      invariantKind: "departure",
      statement: "A row's context value names whether the seat runs and where it stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here performs a step.",
    },
  ],
} as const satisfies Module
