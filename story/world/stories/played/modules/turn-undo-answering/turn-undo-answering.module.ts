import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnUndoAnswering = {
  id: "01a0f1ca-3316-7873-b641-ff03a2421454",
  type: "page-type/module",
  slug: "turn-undo-answering",
  definition: "the latest turn its player asked to have undone, cancelled or taken back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn before player is cancelled, taking back the mechanics written for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at player is taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Either runs the command's own code, as a caller in no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Either puts the turn's action back in the story's action draft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is undone where its page is gone once the command answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ask is taken off the story once the turn is undone or the undoing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is left on the story in the words the command refused with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stories watched are read again on every round, so a new story is watched.",
    },
  ],
} as const satisfies Module
