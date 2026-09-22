import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const phraseParsing = {
  id: "01a0c5a0-dcdf-78bc-b3a9-d53923805df8",
  type: "page-type/module",
  slug: "phrase-parsing",
  definition: "how many ways a phrase is written from the constructions the grammar has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A phrase is split on spaces, and a word spelt with anything else is no word here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word is a part of speech where a spelling on some page says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A spelling is matched as written, so a word with a capital is a spelling of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ways are counted to two, because one way and more than one are what a reader needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A phrase kind reached again over the same words counts as no way rather than as a loop.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page out of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word closing with an apostrophe and an s is split into the word and that mark.",
    },
  ],
} as const satisfies Module
