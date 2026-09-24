import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gapRowFiling = {
  id: "01a0bab3-6aea-7212-b459-11f2ce2dc7b7",
  type: "page-type/module",
  slug: "gap-row-filing",
  definition: "the per-page gap rows the gaps picture is drawn from, kept beside the picture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The gap rows a landing draws from are the rows the landing before it filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing works out again the gap rows of the pages its change names, and no others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The filed rows are read from the files on disk, because no commit holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with no row yet is filled by reading every page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filed line not shaped as a gap row is read by reading every page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are filed in path order, then in the order the page says them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no gap holds no row, so a page is read by the gaps it states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The gaps counted are the rows filed, so the count is the one the gaps panel hangs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
