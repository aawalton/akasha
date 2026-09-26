import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const diceThrowing = {
  id: "01a0de28-48fb-7955-8bf2-53eabca62339",
  type: "page-type/module",
  slug: "dice-throwing",
  definition: "the faces a handful of dice shows for a seed, and what those faces come to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw is the dice rolled from a seed, then read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw refuses whatever the rolling or the reading refuses.",
    },
  ],
} as const satisfies Module
