import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArchiveBoons = {
  id: "01a1597d-c5e3-730f-a1cc-e18757d6a7c1",
  type: "page-type/module",
  slug: "characters-archive-boons",
  definition: "each Infinite Archive verse and vision the player holds now",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each verse and vision keeps its ability id, its name, its text and its stacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verse is held once, and a vision keeps the stacks the game gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Outside the Archive no boon is read.",
    },
  ],
  createdAt: "2026-10-20T13:26:17.314Z",
  updatedAt: "2026-10-20T13:26:17.314Z",
} as const satisfies Module
