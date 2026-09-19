import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedShell = {
  id: "01a0a164-5a91-7e83-b7f5-92c604ad817e",
  type: "page-type/module",
  slug: "played-shell",
  definition: "the display a story played draws over its own play, with the game's panels",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The run drawn is the story's played turns, or its chapters where it has no turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows drawn are the rows naming this story and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is drawn until the rows of the story have arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no turn and no chapter of its own draws nothing at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game that went unread is said so above the run rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels sit in a drawer on a narrow screen and beside the run on a wide one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here polls, and no tagline is drawn, because this play takes no action.",
    },
  ],
} as const satisfies Module
