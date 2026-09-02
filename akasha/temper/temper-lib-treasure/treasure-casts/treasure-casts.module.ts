import type { Module } from "@akasha/code-system/module"

export const treasureCasts = {
  id: "01a061d5-d0b3-779c-a12e-41bcbf143e5d",
  pageTypeSlug: "module",
  slug: "treasure-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
