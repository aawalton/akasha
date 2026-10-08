import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const loreAbout = {
  id: "01a0d426-439c-7d51-9d3c-9df614dce06f",
  type: "page-type/relation-property",
  slug: "lore-about",
  propertySlug: "about",
  definition: "the page a piece of lore is about",
  targetPageType: "page-type/page",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lore about no one page names none.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T16:01:12.604Z",
  updatedAt: "2026-09-24T16:01:28.000Z",
} as const satisfies RelationProperty
