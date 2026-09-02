import type { Module } from "@akasha/code-system/module"

export const libSetsCasts = {
  id: "01a0617b-4b73-706b-9bf0-e2b177ca28eb",
  pageTypeSlug: "module",
  slug: "lib-sets-casts",
  definition: "the narrowings this library uses to read a value the game hands over untyped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each narrowing here names one shape and answers a value of that shape.",
    },
    {
      invariantKind: "gap",
      statement: "A narrowing here asserts a shape the compiler never sees evidence for.",
    },
  ],
} as const satisfies Module
