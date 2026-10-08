import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const navParent = {
  id: "01a0680e-5e00-7001-b562-4f8a2d1c5102",
  type: "page-type/relation-property",
  slug: "nav-parent",
  propertySlug: "nav-parent",
  definition: "the nav item a nav item sits beneath",
  targetPageType: "page-type/nav",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Navigation is one level deep or two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item naming no parent is at the top.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:16:07.168Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
