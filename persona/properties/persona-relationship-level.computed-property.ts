import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const personaRelationshipLevel = {
  id: "01a082dd-bbc6-70a8-b7c5-94c16ef56e98",
  type: "page-type/computed-property",
  slug: "persona-relationship-level",
  propertySlug: "relationship-level",
  definition: "the rung of the closeness ladder a persona's points have reached",
  holds: "number",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every persona starts at level 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is the highest rung a persona's points have reached or passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung is read off the closeness level of that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs are climbed from the first upward until a rung is out of reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level the ladder states no rung for is out of reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points short of the next rung leave the level unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona with no total at all is level 0.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here adds up a persona's points.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung is spelled here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
