import type { Module } from "@akasha/code/module"

export const liveStoreWriteGuard = {
  id: "01a068a4-60f0-7002-93ad-6a1e24aebfeb",
  pageTypeSlug: "module",
  type: "module",
  slug: "live-store-write-guard",
  definition: "a test run's write into Alan's own checkout refused before it can land real data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write outside a test run is let through untouched.",
    },
    {
      invariantKind: "departure",
      statement: "A write into a root that is no live checkout is let through untouched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the environment variable that points the test at a fixture checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The root a write is going to is not itself guarded.",
    },
    {
      invariantKind: "departure",
      statement: "The roots that root is read against are guarded.",
    },
  ],
} as const satisfies Module
