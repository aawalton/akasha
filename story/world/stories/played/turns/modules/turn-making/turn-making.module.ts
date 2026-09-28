import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnMaking = {
  id: "01a0decc-a86e-79d7-b3b5-327c056ef9a5",
  type: "page-type/module",
  slug: "turn-making",
  definition: "a played turn made from the action a player typed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made through the pages service, since the web server holds no index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made at world-builder, holding the action as the player typed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is written beside the story's latest turn and as a page new to its type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn copies the story and the unit the latest turn states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story left with no open turn makes its next turn after its last chapter's last turn.",
    },
  ],
} as const satisfies Module
