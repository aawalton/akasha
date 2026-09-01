import type { Module } from "@akasha/code-system/module"

export const scratching = {
  id: "01a04e38-e129-7fb0-90d9-b552acc212d8",
  pageTypeSlug: "module",
  slug: "scratching",
  definition:
    "the scratch root a test stands up, the bodies it stands there, and the sweep that takes it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body put in a test's scratch root goes through one spelling giving back git's own id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scratch root is swept when the test file that stood the scratch root up ends pass or fail.",
    },
    {
      invariantKind: "departure",
      statement: "A test names only the prefix the test wants.",
    },
    {
      invariantKind: "departure",
      statement: "The root and its sweeping are not its concern.",
    },
    {
      invariantKind: "departure",
      statement: "A scratch root stands under `/var/tmp` named here and never asked of the system.",
    },
    {
      invariantKind: "departure",
      statement: "What the system points at is a tmpfs cut from the memory the machine runs on.",
    },
    {
      invariantKind: "departure",
      statement: "A shared tmpfs is no scratch disk.",
    },
    {
      invariantKind: "departure",
      statement: "Filling a shared tmpfs takes the whole machine down with the shared tmpfs.",
    },
    {
      invariantKind: "departure",
      statement: "The place scratch stands in is spelled once here.",
    },
    {
      invariantKind: "departure",
      statement: "Every scratch root the command system takes is taken from that place.",
    },
  ],
} as const satisfies Module
