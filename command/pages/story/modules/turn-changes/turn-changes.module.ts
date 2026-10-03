import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnChanges = {
  id: "01a10262-bbed-735d-a323-5c1e9b056260",
  type: "page-type/module",
  slug: "turn-changes",
  definition: "a turn or chapter's beats file read and written, and its changes checked and cached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's beats, scenes, changes and memory are read from its one beats file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beats file that does not read refuses the advance rather than reading as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move rewrites the beats file with only its own step's part replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's move writes the beats afresh, with no step's part after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's changes are checked against the pages, after the turn's changes so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages hold the values from before the turn until it moves to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move to player writes every change onto its page, in the one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move writes its prose and its beats as files beside the turn.",
    },
  ],
} as const satisfies Module
