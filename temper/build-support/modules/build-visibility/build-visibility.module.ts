import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildVisibility = {
  id: "01a090f5-2e81-76eb-9c68-b06b5d7c8f38",
  type: "page-type/module",
  slug: "build-visibility",
  definition: "how visible a saved build is, taken from the word stored for it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character build and a companion build are visible in the same ways.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stored word naming no visibility is read as private.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`live` and `target` are visibilities a player never sets directly.",
    },
  ],
} as const satisfies Module
