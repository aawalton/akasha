import type { Module } from "@akasha/code/module"

export const commandAnswering = {
  id: "01a07c6e-41a7-7d0a-8e45-27f5fb2e74f2",
  pageTypeSlug: "module",
  slug: "command-answering",
  definition: "the answer a command hands back, and the code that answer has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal is the caller's mistake unless the caller names another code.",
    },
    {
      invariantKind: "departure",
      statement: "A value answered as JSON is one line of JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A fault with a code of its own is answered with that code.",
    },
    {
      invariantKind: "departure",
      statement: "A fault with no code of its own is answered as operational.",
    },
    {
      invariantKind: "departure",
      statement: "A fault is answered as the one refusal its message makes.",
    },
    {
      invariantKind: "departure",
      statement: "A word where a command takes flags alone is the caller's mistake.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the words a command was called with.",
    },
  ],
} as const satisfies Module
