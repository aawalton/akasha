import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatUiLiveReport = {
  id: "01a0617f-5856-73b0-8876-bbedee1f7c48",
  type: "page-type/module",
  slug: "combat-ui-live-report",
  definition: "the small window shown during a fight rather than after it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The live report and the HUD bar read their figures from one set of texts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The fight report stays as upstream has it, and only the live display departs from upstream.",
    },
  ],
  updatedAt: "2026-10-08T15:14:06.756Z",
} as const satisfies Module
