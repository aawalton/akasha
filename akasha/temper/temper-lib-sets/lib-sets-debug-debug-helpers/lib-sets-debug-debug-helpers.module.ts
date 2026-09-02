import type { Module } from "@akasha/code-system/module"

export const libSetsDebugDebugHelpers = {
  id: "01a0623c-2df7-7868-8d71-09bd658923d5",
  pageTypeSlug: "module",
  slug: "lib-sets-debug-debug-helpers",
  definition: "the set ids missing from the preloaded tables and the squeeze on item id lists",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of consecutive item ids is written as a start value and a count.",
    },
    {
      invariantKind: "departure",
      statement: "Set ids named as belonging to a newer API version count as new on a live client.",
    },
  ],
} as const satisfies Module
