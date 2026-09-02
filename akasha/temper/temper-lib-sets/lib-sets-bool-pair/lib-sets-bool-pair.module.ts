import type { Module } from "@akasha/code-system/module"

export const libSetsBoolPair = {
  id: "01a0617b-4b74-7947-906e-dc19a68d36b8",
  pageTypeSlug: "module",
  slug: "lib-sets-bool-pair",
  definition: "a two-entry table the game keys by false and by true",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Lua table may be keyed by a boolean.",
    },
  ],
} as const satisfies Module
