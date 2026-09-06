import type { Module } from "@akasha/code/module"

export const restating = {
  id: "01a0725b-7254-78a0-805c-1e7767a3e280",
  pageTypeSlug: "module",
  slug: "restating",
  definition: "whether a change moves only the words a page states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is restated where the text inside its quotes moves and nothing else does.",
    },
    {
      invariantKind: "departure",
      statement: "The text a template holds between its expressions is text inside quotes too.",
    },
    {
      invariantKind: "departure",
      statement: "Each body is formatted before the two are compared.",
    },
    {
      invariantKind: "departure",
      statement: "A longer run of text the formatter rewraps is a restatement even so.",
    },
    {
      invariantKind: "departure",
      statement: "A run of text added or taken away is no restatement.",
    },
    {
      invariantKind: "departure",
      statement: "A change to a comment is no restatement.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away is no restatement.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not there yet is no restatement.",
    },
    {
      invariantKind: "departure",
      statement: "Only a TypeScript body is judged here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
