import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const attributeLevel = {
  id: "01a0c4b0-4a14-730d-a7cf-b11505b9cc59",
  type: "page-type/module",
  slug: "attribute-level",
  definition: "the level a figure of points has climbed to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every attribute starts at level 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is the highest rung an attribute's points have reached or passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung is the points every climb up to that rung has cost together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The climb to level 1 costs ten points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The climb to each later level costs ten times the next Fibonacci number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs are worked out as far as a figure reaches rather than read off a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs have no top.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points short of the next rung leave the level unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is a whole number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points of zero or below are level 0.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here adds up an attribute's points.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says how a level is written out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
