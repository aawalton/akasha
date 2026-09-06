import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const attributesLevelling = {
  id: "01a078c1-e871-721c-bb31-4940b59e4afe",
  pageTypeSlug: "module",
  slug: "attributes-levelling",
  definition: "the level an attribute's points have climbed to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every attribute starts at level 0.",
    },
    {
      invariantKind: "departure",
      statement: "A level is the highest rung an attribute's points have reached or passed.",
    },
    {
      invariantKind: "departure",
      statement: "A rung is the points every climb up to that rung has cost together.",
    },
    {
      invariantKind: "departure",
      statement: "The climb to level 1 costs ten points.",
    },
    {
      invariantKind: "departure",
      statement: "The climb to each later level costs ten times the next Fibonacci number.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs are worked out as far as a figure reaches rather than read off a list.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs have no top.",
    },
    {
      invariantKind: "departure",
      statement: "Points short of the next rung leave the level unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A level is a whole number.",
    },
    {
      invariantKind: "departure",
      statement: "Points of zero or below are level 0.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here adds up an attribute's points.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how a level is written out.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
