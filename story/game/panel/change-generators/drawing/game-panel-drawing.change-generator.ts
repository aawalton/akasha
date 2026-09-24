import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const gamePanelDrawing = {
  id: "01a0d4eb-8021-7abb-b025-0f85f9595d93",
  type: "page-type/change-generator",
  slug: "game-panel-drawing",
  definition: "the script each game panel is drawn by, turned from the code beside that panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel whose code the change leaves has its script turned again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scripts are turned again only where the change has a panel's file.",
    },
  ],
} as const satisfies ChangeGenerator
