import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelDrawing = {
  id: "01a0c4a0-5cab-7fbb-bff7-7af9f2ab4dbf",
  type: "page-type/module",
  slug: "panel-drawing",
  definition: "what every panel of a game's interface is handed to draw itself",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel is handed the same thing, whatever that panel draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel reads what it needs off what it was handed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a panel is handed is the state of the game and the run of the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel is handed what sends the game a choice, where the game has a game master.",
    },
  ],
} as const satisfies Module
