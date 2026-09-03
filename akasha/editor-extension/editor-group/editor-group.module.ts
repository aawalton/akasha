import type { Module } from "../../code-system/modules/module.page-type.ts"

export const editorGroup = {
  id: "01a064d3-f9f9-7a0f-bdd7-95ee76ccf31e",
  pageTypeSlug: "module",
  slug: "editor-group",
  definition: "the column a seat's terminal opens in and the reason that column was chosen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A column is chosen from the columns already open.",
    },
    {
      invariantKind: "departure",
      statement: "The column remembered for a seat is chosen where that column is still open.",
    },
    {
      invariantKind: "departure",
      statement: "An ancestor's column is chosen where the remembered column is not open.",
    },
    {
      invariantKind: "departure",
      statement: "The lowest open column is chosen where neither of the other two is open.",
    },
    {
      invariantKind: "departure",
      statement: "A choice says whether the column was remembered or an ancestor's or the lowest.",
    },
    {
      invariantKind: "departure",
      statement: "The first column is numbered one.",
    },
    {
      invariantKind: "departure",
      statement: "A choice made with no column open answers the first column.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat's terminal is asked for by a name and by the column the terminal opens in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a terminal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here remembers a column for a seat.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the editor which columns are open.",
    },
  ],
} as const satisfies Module
