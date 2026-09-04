import type { Module } from "@akasha/code-system/module"

export const testReverseReachability = {
  id: "01a0685e-023f-7015-aa59-8cc24708b0f6",
  pageTypeSlug: "module",
  slug: "test-reverse-reachability",
  definition: "every file each test file reaches by following imports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The graph and the reading of it are handed in rather than reached for.",
    },
    {
      invariantKind: "departure",
      statement: "A node standing for no file of the code repo is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A test file reaches itself, because the closure holds the node it started from.",
    },
  ],
} as const satisfies Module
