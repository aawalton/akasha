import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionIntent = {
  id: "01a0c503-8445-7c0d-bdd7-0c4b72f362c5",
  type: "page-type/module",
  slug: "action-intent",
  definition: "the intent an actor puts behind an act, held between none and ten",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Intent is held between none and ten wherever a mechanic reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling on intent is what keeps every add riding on it from running away.",
    },
  ],
} as const satisfies Module
