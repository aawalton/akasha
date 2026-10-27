import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const settledBy = {
  id: "01a17f62-99b3-7e54-b87e-06c42fc08013",
  type: "page-type/relation-property",
  slug: "settled-by",
  propertySlug: "settled-by",
  definition: "the check whose code settles a check that carries no code of its own",
  targetPageType: "page-type/world-check",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A check states its own `settling` or names the check settling it, never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The check named settles by its own code, so one hop reaches the code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone's checks name their source's checks here, so no rule is spelled twice.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T22:02:10.738Z",
  updatedAt: "2026-10-27T22:02:10.738Z",
} as const satisfies RelationProperty
