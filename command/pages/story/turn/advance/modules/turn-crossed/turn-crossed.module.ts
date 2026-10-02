import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnCrossed = {
  id: "01a0f429-82b7-7843-80e6-20c2827c77b5",
  type: "page-type/module",
  slug: "turn-crossed",
  definition: "the levels and ranks the checks settled on the turn before a turn crossed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn reaching its game master from the world builder names what the turn before it crossed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn's growth is settled after its prose is written, so the next turn first shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level, rank, tier, stage or depth an answer states other than its reading did is a crossing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming its kind that moves from one value to another is a crossing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value moving in an entry naming no kind is a number climbing, not a crossing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line a later line replaces crosses nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the game master is told, and not at player, since that notice goes once a next turn is made.",
    },
  ],
} as const satisfies Module
