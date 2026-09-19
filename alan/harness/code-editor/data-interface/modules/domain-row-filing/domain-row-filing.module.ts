import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainRowFiling = {
  id: "01a0ba96-7fb2-7a7e-b5a5-3d48da0d7bc4",
  type: "page-type/module",
  slug: "domain-row-filing",
  definition: "the per-page rows the domain pictures are drawn from, kept beside the picture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows a landing draws from are the rows the landing before it filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing works out again the rows of the pages its change names, and no others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The filed rows are read from the working tree, because no commit holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with no row yet is filled by reading every page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change naming a page of a kind no row holds is read by reading every page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are filed in path order, so a page that changes moves one line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
