import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const entryRows = {
  id: "01a0c570-221d-73e8-8433-a1d654e49aab",
  type: "page-type/module",
  slug: "entry-rows",
  definition: "the rows the file beside a page holds under an entry property",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file nothing has written yet holds no row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line carrying nothing but blanks is no row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads what a row says.",
    },
  ],
} as const satisfies Module
