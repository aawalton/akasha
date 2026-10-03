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
      statement:
        "A turn any mechanics seat found issues in goes back to game-master once in each run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run is one set of hand-ins by the mechanics seats, begun by the game master's beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewers' send-back reruns mechanics, which sends back again in the run it begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn no seat found an issue in goes on to its writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's issues are merged with the turn's and written to the file beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change past the turn's last beat is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat, an issue or a change note is at most 100 characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter holds at most 100 beats, or 200 where its story has editor steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A played turn holds however many beats and issues the story needs of it.",
    },
  ],
} as const satisfies Module
