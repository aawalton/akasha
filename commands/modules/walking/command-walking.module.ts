import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const commandWalking = {
  id: "01a08171-a8fd-7adf-8d4e-cb3813757c6b",
  type: "module",
  slug: "command-walking",
  definition: "the level of the command tree a line's words reach, and the words reaching a level",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each leading word of the command line steps one level down the command tree.",
    },
    {
      invariantKind: "departure",
      statement: "A word reaches a level only where that level states that word as its name.",
    },
    {
      invariantKind: "departure",
      statement: "A word other than the name of the level it reaches ends the walk.",
    },
    {
      invariantKind: "departure",
      statement: "A level under another page type than the one looked under ends the walk too.",
    },
    {
      invariantKind: "departure",
      statement: "What a level states as its name is handed in rather than read here.",
    },
    {
      invariantKind: "departure",
      statement: "A level stating no name is reached by the words taken joined with a hyphen.",
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
      statement: "A level whose own name has a hyphen is reached in one word carrying that hyphen.",
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
      invariantKind: "departure",
      statement: "The words reaching a level are each name above that level, ending with its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "That name is taken off the end of the slug, and what is left names the level above.",
    },
    {
      invariantKind: "departure",
      statement: "A level stating no name is reached by what is left of its slug as one word.",
    },
    {
      invariantKind: "departure",
      statement: "A level whose name is no ending of its slug is reached the same way.",
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
