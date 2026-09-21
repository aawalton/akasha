import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const anchorImage = {
  id: "01a0c5ea-620f-7f03-9757-5e71f545f25a",
  type: "page-type/relation-property",
  slug: "anchor-image",
  propertySlug: "anchor",
  definition: "the picture every other picture of a persona is drawn to match",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona has one anchor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor may be one of the persona's covers as well.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
