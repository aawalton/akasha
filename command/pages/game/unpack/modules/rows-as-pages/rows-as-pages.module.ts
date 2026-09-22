import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rowsAsPages = {
  id: "01a0c955-a960-754f-adb6-685f72644513",
  type: "page-type/module",
  slug: "rows-as-pages",
  definition: "one row a game kept in a file, made into the values and bodies of a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind of row a game keeps has its own way of becoming a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is named for its game and for the name the row was filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row with no name of its own is named for its place in the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What varies with the kind of row is a file beside the page rather than a value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
