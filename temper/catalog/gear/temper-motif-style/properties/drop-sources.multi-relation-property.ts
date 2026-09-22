import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const dropSources = {
  id: "01a05fd1-d439-7027-bdca-1804e14d6caf",
  type: "page-type/multi-relation-property",
  slug: "drop-sources",
  propertySlug: "drop-sources",
  definition: "the daily errands that drop a style's motif pages",
  targetPageType: "page-type/temper-scribing-source",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every errand a style drops from.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
