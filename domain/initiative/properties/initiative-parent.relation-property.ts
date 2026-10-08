import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const initiativeParent = {
  id: "01a04e58-5735-7668-9aee-b2da5c7b346a",
  type: "page-type/relation-property",
  slug: "initiative-parent",
  propertySlug: "parent",
  definition: "an initiative's parent initiative",
  targetPageType: "page-type/initiative",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An initiative lists nothing beneath that initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This edge is read inverted.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-29T16:26:47.477Z",
  updatedAt: "2026-09-22T13:59:52.000Z",
} as const satisfies RelationProperty
