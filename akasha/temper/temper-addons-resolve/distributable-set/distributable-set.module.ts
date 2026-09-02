import type { Module } from "@akasha/code-system/module"

export const distributableSet = {
  id: "01a06060-ec3f-72a0-9eb4-c159dfd1784e",
  pageTypeSlug: "module",
  slug: "distributable-set",
  definition: "which addons a release carries and which addons a release leaves to the player",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon named in the set being released is carried.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency on an addon outside the set is left to the player.",
    },
    {
      invariantKind: "departure",
      statement: "An optional dependency counts the same as a required one.",
    },
    {
      invariantKind: "departure",
      statement: "A version floor written after the name is cut off before the name is matched.",
    },
    {
      invariantKind: "departure",
      statement: "Both lists are answered in sorted order.",
    },
  ],
} as const satisfies Module
