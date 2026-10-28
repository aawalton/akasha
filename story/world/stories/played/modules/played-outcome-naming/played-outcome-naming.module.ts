import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedOutcomeNaming = {
  id: "01a183a6-c667-7d2d-a52a-b3d0e24617b9",
  type: "page-type/module",
  slug: "played-outcome-naming",
  definition: "what the pages an outcome line names say of themselves to its card",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character a line names is drawn by its title, in the color it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the card cannot read is drawn by no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose state the card cannot read is taken as unrevealed.",
    },
  ],
  createdAt: "2026-10-28T17:55:07.494Z",
  updatedAt: "2026-10-28T17:55:07.494Z",
} as const satisfies Module
