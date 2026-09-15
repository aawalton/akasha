import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const measureGathering = {
  id: "01a09ba7-053e-780b-83b0-83bbba287ce9",
  type: "module",
  slug: "measure-gathering",
  definition: "the runs an entries file holds, gathered under what ran and weighed over a window",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which files hold the rows is answered by the caller rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A page hands over every numbered entries file beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page that is not there is no file to read.",
    },
    {
      invariantKind: "departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "departure",
      statement: "A row a write left half appended is passed over and the rest of the file read.",
    },
    {
      invariantKind: "departure",
      statement: "The file that row is in is named among the files a row would not read in.",
    },
    {
      invariantKind: "departure",
      statement: "Which rows count as runs is answered by the caller rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under what the row says ran.",
    },
    {
      invariantKind: "departure",
      statement: "A window is chosen by the rule the check measuring chooses one by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A window of runs counts the most recent run ids rather than the most recent rows.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are ordered by what their runs took on average.",
    },
    {
      invariantKind: "absence",
      statement: "No page is reached through the index here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a table.",
    },
  ],
} as const satisfies Module
