import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type DirectiveKind = "rule" | "principle"

export const directiveKind = {
  id: "01a04e1f-cbf6-7619-8cf2-ab2e898f5abe",
  pageTypeSlug: "relation-property",
  slug: "directive-kind",
  propertySlug: "directive-kind",
  definition: "which sort of directive one entry is",
  targetPageTypeSlug: "page-type/directive-kind",
} as const satisfies RelationProperty
