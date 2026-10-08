import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortChoose = {
  id: "01a11c00-c349-7071-b3cd-f41cd90f2c11",
  type: "page-type/module",
  slug: "quest-port-choose",
  definition: "which travel point is nearest a quest objective, worked out from what the map holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The objective is the first condition of the quest that is shown and neither failed nor complete.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wayshrine the player has not found is never a target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A house is a target only where the player owns that house.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A node the map does not show, a locked node and an outbound-only node are never targets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Distance is straight-line distance on the map.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of two targets equally near, the one the game lists first is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here calls the game.",
    },
  ],
} as const satisfies Module
