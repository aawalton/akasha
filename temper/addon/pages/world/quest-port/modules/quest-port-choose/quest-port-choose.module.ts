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
        "The objective is chosen in the order the game's own Map button tries a quest's conditions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That order is each step's unfinished conditions then its ending, then every finished condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition the journal does not show is tried like any other.",
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
      statement:
        "The way into a dungeon, trial or arena is the node neither wayshrine nor house that bears its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Names are matched whole, with case ignored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A way in is a target only where the player has found it and it is neither locked nor outbound only.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A namesake of a place is a node neither wayshrine nor house sharing a word of four letters or more.",
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
      decisionKind: "decision-kind/departure",
      statement: "A map with no target is zoomed out of unless the map is overland.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Zooming out to look for targets stops after three levels.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here calls the game.",
    },
  ],
  createdAt: "2026-10-08T14:52:54.473Z",
  updatedAt: "2026-10-19T18:29:18.637Z",
} as const satisfies Module
