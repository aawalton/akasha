import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingWindowControls = {
  id: "01a06128-d5d7-7454-b0b7-fa5c32e5a1dd",
  type: "page-type/module",
  slug: "housing-window-controls",
  definition: "the housing window's search box and scroll frames",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scroll frame has a slider the add-on made rather than the game's.",
    },
  ],
} as const satisfies Module
