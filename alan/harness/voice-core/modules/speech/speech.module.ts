import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const speech = {
  id: "01a05b55-e06e-713c-ae5c-d556cabac43e",
  type: "page-type/module",
  slug: "speech",
  definition:
    "written text flattened and cut into pieces short enough for a voice to render at once",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Markup is flattened away before anything is cut.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fenced code block is spoken as a note that code was left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence is cut at a stop followed by space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Sentences are packed together up to the budget rather than sent one sentence at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word longer than the budget is broken inside itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number of pieces is capped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece past the cap is dropped.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A leading bracketed marker is taken off each paragraph before the paragraph is spoken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a voice model.",
    },
  ],
} as const satisfies Module
