import type { Module } from "@akasha/code-system/module"

export const phraseParsing = {
  id: "01a05d93-dbee-7e54-9e8d-403e045e0ce6",
  pageTypeSlug: "module",
  slug: "phrase-parsing",
  definition: "a sentence read against a grammar, and where the reading stopped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A word carrying several classes is read every way.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence parses where any one reading of the sentence reaches the end.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the word the reading stopped at.",
    },
    {
      invariantKind: "departure",
      statement: "The word a reading stopped at is where the grammar wants a rule.",
    },
    {
      invariantKind: "departure",
      statement: "A rule carrying no symbols on its right is dropped.",
    },
    {
      invariantKind: "absence",
      statement: "No tree is built.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows any grammar of its own.",
    },
  ],
} as const satisfies Module
