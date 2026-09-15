import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const speech = {
  id: "01a05b55-e06e-713c-ae5c-d556cabac43e",
  type: "module",
  slug: "speech",
  definition:
    "written text flattened and cut into pieces short enough for a voice to render at once",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Markup is flattened away before anything is cut.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fenced code block is spoken as a note that code was left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sentence is cut at a stop followed by space.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Sentences are packed together up to the budget rather than sent one sentence at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word longer than the budget is broken inside itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The number of pieces is capped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A piece past the cap is dropped.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A leading bracketed marker is taken off each paragraph before the paragraph is spoken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a voice model.",
    },
  ],
} as const satisfies Module
