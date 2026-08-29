import type { Module } from "../../code-system/module/module.page-type.ts"

export const scratching = {
  id: "01a04e38-e129-7fb0-90d9-b552acc212d8",
  pageTypeSlug: "module",
  slug: "scratching",
  definition:
    "the scratch root a test stands up, and the sweep that takes it however the test ends",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scratch root is swept when the test file that stood it up ends, pass or fail.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test names only the prefix it wants; the root and its sweeping are not its concern.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scratch root stands under `/var/tmp`, named here and never asked of the system.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the system points at is a tmpfs cut from the memory the machine runs on, and a " +
        "shared tmpfs is no scratch disk — filling it takes the whole machine down with it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The place scratch stands in is spelled once, here, and every scratch root the command " +
        "system takes is taken from it, so what leaks is looked for and swept in one place.",
    },
  ],
} as const satisfies Module
