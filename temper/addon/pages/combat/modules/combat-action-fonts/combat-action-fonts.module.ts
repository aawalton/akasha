import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatActionFonts = {
  id: "01a0617f-5831-72ff-bc69-ccfe46ca94c7",
  type: "page-type/module",
  slug: "combat-action-fonts",
  definition: "the action widgets' label fonts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting names a label's face by the game's font string, as `BOLD_FONT`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The font a label is handed expands that name, as `$(BOLD_FONT)`.",
    },
  ],
  createdAt: "2026-09-02T09:42:10.737Z",
  updatedAt: "2026-10-27T20:05:13.584Z",
} as const satisfies Module
