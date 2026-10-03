import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnChanges = {
  id: "01a10262-bbed-735d-a323-5c1e9b056260",
  type: "page-type/module",
  slug: "turn-changes",
  definition: "the mechanics step's changes of one turn or chapter, read, checked and cached",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's changes are read from the file beside it.",
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
  ],
} as const satisfies Module
