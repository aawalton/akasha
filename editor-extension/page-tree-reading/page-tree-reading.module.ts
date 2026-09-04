import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreeReading = {
  id: "01a06867-dbcb-7300-9560-2f216f804af7",
  pageTypeSlug: "module",
  slug: "page-tree-reading",
  definition: "the index answers a page tree is asked for, and the tree assembled out of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The answers are asked as a child process because reading the index wants a runtime this host is not.",
    },
    {
      invariantKind: "departure",
      statement: "The command answers three groups of rows and the tree is assembled here.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer that is no JSON is refused with what the command printed named.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer failing the shape asked for is refused with what failed said.",
    },
    {
      invariantKind: "departure",
      statement: "A row's value is text, a list of text, or nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row states the checkout it was read from ahead of the path inside it.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming a checkout this does not hold opens no document.",
    },
    {
      invariantKind: "departure",
      statement: "A row standing for no page opens no document.",
    },
    {
      invariantKind: "departure",
      statement: "How many rows the tree holds is counted apart from how many open a document.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
