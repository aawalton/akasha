import type { Module } from "@akasha/code-system/module"

export const pingLeakyBucket = {
  id: "01a0605f-6261-7d76-ba42-e30ce5260d08",
  pageTypeSlug: "module",
  slug: "ping-leaky-bucket",
  definition: "the token budget a group ping is spent from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token count is refilled from the time passed at each read.",
    },
    {
      invariantKind: "departure",
      statement: "A take succeeds only above a safety threshold.",
    },
  ],
} as const satisfies Module
