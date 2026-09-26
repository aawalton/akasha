import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companions = {
  id: "01a06119-5caf-7f14-b426-f5ed8d06b488",
  type: "page-type/module",
  slug: "companions",
  definition: "every companion a player may take along, as the held companion catalogue has them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The companions are read from their pages rather than kept in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for a companion no page answers to is refused rather than answered empty.",
    },
  ],
} as const satisfies Module
