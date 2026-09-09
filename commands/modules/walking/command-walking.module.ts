import type { Module } from "@akasha/code/module"

export const commandWalking = {
  id: "01a08171-a8fd-7adf-8d4e-cb3813757c6b",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-walking",
  definition: "the level of the command tree a line's leading words reach",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each leading word of the command line steps one level down the command tree.",
    },
    {
      invariantKind: "departure",
      statement: "A level's name is the words taken down to that level joined with a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A word that could be no part of a slug ends the walk before that word.",
    },
    {
      invariantKind: "departure",
      statement: "The deepest level with a page is the level reached.",
    },
    {
      invariantKind: "departure",
      statement: "A level with nothing is stepped through rather than ending the walk.",
    },
    {
      invariantKind: "departure",
      statement: "How many words the walk took is carried with the level reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "The call as it was written is those words with the spaces they were written with.",
    },
    {
      invariantKind: "departure",
      statement: "A level reached in one word keeps the hyphen that word has.",
    },
    {
      invariantKind: "departure",
      statement: "The page type the levels are looked for under is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A walk under no page type reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "How deep the walk goes is bounded by the words the line offers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what the level reached means.",
    },
  ],
} as const satisfies Module
