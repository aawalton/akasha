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
} as const satisfies RelationProperty
