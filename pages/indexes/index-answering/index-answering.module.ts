import type { Module } from "@akasha/code-system/module"

export const indexAnswering = {
  id: "01a05eca-0849-789d-8118-1e8d7ae05244",
  pageTypeSlug: "module",
  slug: "index-answering",
  definition: "the index's answers bound to one reading, each asked without naming an index",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every question here is asked of the one reading the answers were bound over.",
    },
    {
      invariantKind: "departure",
      statement: "A question here takes no index.",
    },
    {
      invariantKind: "departure",
      statement: "A question here takes no root.",
    },
    {
      invariantKind: "departure",
      statement: "A question here takes no reader of page bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A reader whose reading could be left off is bound to the reading here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reader whose reader of page bodies could be left off is bound to the reader of page bodies here.",
    },
    {
      invariantKind: "departure",
      statement: "The root is bound here.",
    },
    {
      invariantKind: "departure",
      statement: "A caller filing a change binds no root.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing more is bound here.",
    },
    {
      invariantKind: "departure",
      statement: "A question here takes what the reader beneath takes besides what is bound here.",
    },
    {
      invariantKind: "departure",
      statement: "The questions bound here are the ones asked of the index through a shadow.",
    },
    {
      invariantKind: "departure",
      statement: "An answer here is what the reader beneath answers with that reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an answer.",
    },
    {
      invariantKind: "gap",
      statement:
        "A reader guarding itself against the index reads that index and the commit at HEAD from the root.",
    },
  ],
} as const satisfies Module
