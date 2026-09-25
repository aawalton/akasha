import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const startMode = {
  id: "01a05395-58a5-760f-a464-178f4d4ebb97",
  type: "page-type/relation-property",
  slug: "start-mode",
  propertySlug: "start-mode",
  definition: "how an agent in a seat is started",
  targetPageType: "page-type/seat-mode",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "Every seat starts in the mode its page states.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
