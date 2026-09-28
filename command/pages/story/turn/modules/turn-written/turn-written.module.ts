import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnWritten = {
  id: "01a0e578-bd91-705f-b288-1755136c1268",
  type: "page-type/module",
  slug: "turn-written",
  definition: "the pages the game master already wrote a turn onto",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is written on a turn where its history has a line for that turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the pages under the mechanics folder beside the turn's folder are looked at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A turn stating no position has no page written on it.",
    },
  ],
} as const satisfies Module
