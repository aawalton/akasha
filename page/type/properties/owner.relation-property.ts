import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const owner = {
  id: "01a06c50-b15f-7d22-9f4b-7590e602dd05",
  type: "page-type/relation-property",
  slug: "owner",
  propertySlug: "owner",
  definition: "the property naming the account a page belongs to",
  targetPageType: "page-type/page-property",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type naming no owner has pages the whole repository owns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type extending another page type takes that page type's owner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow on who owns a page is lowered onto the property a page type names.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T12:07:02.751Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
