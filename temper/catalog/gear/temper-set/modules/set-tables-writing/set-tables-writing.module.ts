import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setTablesWriting = {
  id: "01a0d8e5-f3dd-70e5-9079-f925ae959f72",
  type: "page-type/module",
  slug: "set-tables-writing",
  definition:
    "the writing of the sets addon's set tables and the item browser's rows from set pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A table is written whole from the pages rather than mended entry by entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set is filed in the sets addon's tables only where its page states its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set has an item browser row only where its page names the row's item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot or weight is written as the constant the game names it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set has jewelry where its pieces fill a neck or ring slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafted row's extra number is the traits its set needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is a dungeon where a set page files it as a dungeon, trial or arena.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is a public dungeon where a public dungeon page names it.",
    },
  ],
} as const satisfies Module
