import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const astHash = {
  id: "01a0c566-63e3-7998-abd7-27fab7127b0b",
  type: "page-type/module",
  slug: "ast-hash",
  definition: "a rule condensed to a short key only that same rule answers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two functions saying one thing answer one key here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is short enough to name a file and wide enough that no two rules collide.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A key says nothing about the rule it was made from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
