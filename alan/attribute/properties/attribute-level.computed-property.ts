import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const attributeLevel = {
  id: "01a081cc-5b79-71ea-9492-1757bb05214d",
  type: "page-type/computed-property",
  slug: "attribute-level",
  propertySlug: "level",
  definition: "the level an attribute's total points have climbed to",
  holds: "number",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every attribute starts at level 0.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is the highest rung an attribute's points have reached or passed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rung is the points every climb up to that rung has cost together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The climb to level 1 costs ten points.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The climb to each later level costs ten times the next Fibonacci number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rungs are worked out as far as a figure reaches rather than read off a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rungs have no top.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Points short of the next rung leave the level unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is a whole number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Points of zero or below are level 0.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute with no total at all is level 0.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here adds up an attribute's points.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says how a level is written out.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
