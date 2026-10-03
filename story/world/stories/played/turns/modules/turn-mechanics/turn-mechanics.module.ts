import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnMechanics = {
  id: "01a10262-bbed-72e9-9b48-d878d344e3fe",
  type: "page-type/module",
  slug: "turn-mechanics",
  definition: "what one mechanics seat's advance adds to a turn or chapter, and where it goes next",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mechanics seat hands in its changes and its issues once a run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn waits at mechanics until every mechanics seat has handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn any mechanics seat found issues in goes back to game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn no seat found an issue in goes on to its writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change past the turn's last beat is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat, an issue or a change note is at most 100 characters, a turn 100 of each.",
    },
  ],
} as const satisfies Module
