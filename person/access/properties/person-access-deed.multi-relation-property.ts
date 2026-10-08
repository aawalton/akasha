import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const personAccessDeed = {
  id: "01a0c4e8-9759-74ba-a799-01d34c3eaea9",
  type: "page-type/multi-relation-property",
  slug: "person-access-deed",
  propertySlug: "deed",
  definition: "what the access lets its holder do",
  targetPageType: "page-type/access-deed",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An access naming no deed lets its holder do nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a thing and changing that thing are two deeds.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T16:59:32.569Z",
  updatedAt: "2026-09-22T13:56:12.000Z",
} as const satisfies MultiRelationProperty
