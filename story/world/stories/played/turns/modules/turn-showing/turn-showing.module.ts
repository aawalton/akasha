import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnShowing = {
  id: "01a18d54-971b-74f4-8fba-609fd2187abf",
  type: "page-type/module",
  slug: "turn-showing",
  definition: "which changes of a played turn reach their pages with one move",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's changes reach their pages in the move that shows that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The changes of a turn off beats reach their pages in its move to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move from player to player shows no change, so no change lands twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The changes not yet shown are those of the beats after the last one shown.",
    },
  ],
  createdAt: "2026-10-30T15:01:33.594Z",
  updatedAt: "2026-10-30T15:01:33.594Z",
} as const satisfies Module
