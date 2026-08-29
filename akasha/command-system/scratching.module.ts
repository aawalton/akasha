import type { Module } from "../code-system/module/module.page-type.ts"

export const scratching = {
  id: "01a04e38-e129-7fb0-90d9-b552acc212d8",
  pageTypeSlug: "module",
  slug: "scratching",
  definition: "the scratch root a test stands up, and the sweep that takes it however the test ends",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scratch root is swept when the test file that stood it up ends, pass or fail.",
    },
    {
      invariantKind: "departure",
      statement: "A test names only the prefix it wants; the root and its sweeping are not its concern.",
    },
  ],
} as const satisfies Module
