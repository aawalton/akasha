import type { Module } from "@akasha/code/module"

export const prosePattern = {
  id: "01a08220-6498-71cb-af30-b73f6642f5fe",
  pageTypeSlug: "module",
  slug: "prose-pattern",
  definition: "where a construction is in a sentence, read off that sentence's tree",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A construction is found in the tree rather than in the words.",
    },
    {
      invariantKind: "departure",
      statement: "A word read as a noun is no construction of that word as an action.",
    },
    {
      invariantKind: "departure",
      statement: "A word whose object comes before it has an object.",
    },
    {
      invariantKind: "departure",
      statement: "A word taking a particle is left alone, because the particle carries the sense.",
    },
    {
      invariantKind: "departure",
      statement: "A word bound to something by `to` and with no object is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Which spellings are one word is the caller's to say.",
    },
    {
      invariantKind: "departure",
      statement: "A word in the passive that puts a thing somewhere is the same construction.",
    },
    {
      invariantKind: "departure",
      statement: "A `to` phrase names no place, so it binds the word rather than placing a thing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word whose only subject is the relativizer has no object anywhere, so it is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A bare adverb after a word is a particle, whatever the parser calls it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word a person or an unknown is the holder of is another sense, so it is left alone.",
    },
  ],
} as const satisfies Module
