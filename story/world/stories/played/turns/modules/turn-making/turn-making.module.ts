import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnMaking = {
  id: "01a0decc-a86e-79d7-b3b5-327c056ef9a5",
  type: "page-type/module",
  slug: "turn-making",
  definition: "a played turn made new, from the action a player typed or as a story's opening",
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn made in a roleplayed story is roleplayed, and every reviewer has passed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's opening is its first turn, and nothing else on the turn marks it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An opening is the one turn made with no action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a roleplayed story is opened, and only while it has no turn and no chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An opening is made at world-builder, with the unit its story states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An opening sits in the turns folder beside its story's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An opening is written by the seat that opens it rather than by the action bar.",
    },
  ],
  createdAt: "2026-09-26T17:39:09.550Z",
  updatedAt: "2026-10-17T20:08:04.087Z",
} as const satisfies Module
