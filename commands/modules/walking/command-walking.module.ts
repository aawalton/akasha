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
      statement: "A level is reached only among the parts the level above it states.",
    },
    {
      invariantKind: "departure",
      statement: "The parts the topmost level states are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A part is handed back as the levels that part names, or as none.",
    },
    {
      invariantKind: "departure",
      statement: "A level's name, its slug, its page type, its path and its parts come together.",
    },
    {
      invariantKind: "departure",
      statement: "A word that could be no part of a slug ends the walk before that word.",
    },
    {
      invariantKind: "departure",
      statement: "The deepest level the words reach is the level reached.",
    },
    {
      invariantKind: "departure",
      statement: "The levels the walk stepped through to reach a level are carried with it.",
    },
    {
      invariantKind: "departure",
      statement: "Those levels are carried widest first.",
    },
    {
      invariantKind: "absence",
      statement: "The level reached is not among the levels carried with it.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming no level is stepped over rather than ending the descent.",
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
      statement: "The page type a level is under is carried with that level.",
    },
    {
      invariantKind: "departure",
      statement: "A descent starting from no part reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A name more than one level under one level states is carried out whole.",
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
      invariantKind: "departure",
      statement: "A naming is built over the levels handed in rather than over any list here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here joins words into a slug.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what the level reached means.",
    },
  ],
} as const satisfies Module
