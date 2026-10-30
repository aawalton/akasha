import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const attribute = {
  id: "01a081ef-0b0a-7889-962d-2e766b9aedee",
  type: "page-type/relation-property",
  slug: "attribute",
  propertySlug: "attribute",
  definition: "the attribute whose points are counted by a readout",
  targetPageType: "page-type/attribute",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout counting an attribute's points names that attribute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout counting anything else names no attribute.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T16:52:01.930Z",
  updatedAt: "2026-10-30T16:08:42.329Z",
} as const satisfies RelationProperty
