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
        "The live report sits on the over-play shade, dimmed further by the player's alpha.",
    },
  ],
  updatedAt: "2026-10-18T17:43:08.318Z",
  createdAt: "2026-09-02T09:42:10.774Z",
} as const satisfies Module
