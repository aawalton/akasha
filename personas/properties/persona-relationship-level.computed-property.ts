import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type PersonaRelationshipLevel = number

export const personaRelationshipLevel = {
  id: "01a082dd-bbc6-70a8-b7c5-94c16ef56e98",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "persona-relationship-level",
  propertySlug: "relationship-level",
  definition: "the rung of the closeness ladder a persona's points have reached",
  holds: "number",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every persona starts at level 0.",
    },
    {
      invariantKind: "departure",
      statement: "A level is the highest rung a persona's points have reached or passed.",
    },
    {
      invariantKind: "departure",
      statement: "A rung is read off the closeness level of that number.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs are climbed from the first upward until one is out of reach.",
    },
    {
      invariantKind: "departure",
      statement: "A level the ladder states no rung for is out of reach.",
    },
    {
      invariantKind: "departure",
      statement: "Points short of the next rung leave the level unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A persona with no total at all is level 0.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here adds up a persona's points.",
    },
    {
      invariantKind: "absence",
      statement: "No rung is spelled here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies ComputedProperty
