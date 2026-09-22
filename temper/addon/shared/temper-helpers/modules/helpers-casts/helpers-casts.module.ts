import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const helpersCasts = {
  id: "01a08d72-b007-7beb-b91e-33727605794e",
  type: "page-type/module",
  slug: "helpers-casts",
  definition: "what a value the game hands over is taken to be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
