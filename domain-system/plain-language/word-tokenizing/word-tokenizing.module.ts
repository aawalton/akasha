import type { Module } from "@akasha/code-system/module"

export const wordTokenizing = {
  id: "01a06cd8-d032-72f6-9824-e37f2a2d3ed0",
  pageTypeSlug: "module",
  slug: "word-tokenizing",
  definition: "the pieces a text is split into before a model reads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sentence ends at a terminal mark.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence ends at a blank line.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence ends at the end of the text.",
    },
    {
      invariantKind: "departure",
      statement: "A word keeps the offsets that word had in the whole document.",
    },
    {
      invariantKind: "departure",
      statement: "A contraction is split into two words.",
    },
    {
      invariantKind: "departure",
      statement: "A word is lowered before that word is encoded.",
    },
    {
      invariantKind: "departure",
      statement: "An accent is dropped before a word is encoded.",
    },
    {
      invariantKind: "departure",
      statement: "A word the pieces do not cover is encoded as the unknown piece.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence wider than the model is split into chunks.",
    },
    {
      invariantKind: "absence",
      statement: "No word is dropped for falling past the model's width.",
    },
  ],
} as const satisfies Module
