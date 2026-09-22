import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCasts = {
  id: "01a0617b-4b73-706b-9bf0-e2b177ca28eb",
  type: "page-type/module",
  slug: "sets-casts",
  definition: "the narrowings this library uses to read a value the game hands over untyped",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each narrowing here names one shape and answers a value of that shape.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A narrowing here asserts a shape the compiler never sees evidence for.",
    },
  ],
} as const satisfies Module
