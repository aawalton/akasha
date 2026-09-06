import type { Module } from "@akasha/code-system/module"

export const seatModes = {
  id: "01a06867-7fc9-7001-ab42-25809f0fc7df",
  pageTypeSlug: "module",
  slug: "seat-modes",
  definition:
    "the two modes a seat runs in, the flag that sets one, and the launch each is seen as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat starts interactive or headless and in no third mode.",
    },
    {
      invariantKind: "departure",
      statement: "A headless seat was spawned and an interactive seat was opened.",
    },
    {
      invariantKind: "departure",
      statement: "A launch naming neither answers no mode rather than a default one.",
    },
    {
      invariantKind: "departure",
      statement: "A mode carried to a launch and back is the mode that mode set out as.",
    },
    {
      invariantKind: "departure",
      statement: "The flag putting a seat in headless is spelled here and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A command line carrying that flag is running headless.",
    },
    {
      invariantKind: "departure",
      statement: "A command line carrying no flag at all is running interactive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat.",
    },
  ],
} as const satisfies Module
