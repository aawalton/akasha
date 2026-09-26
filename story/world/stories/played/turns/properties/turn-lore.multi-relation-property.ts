import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const turnLore = {
  id: "01a0deaf-0e2e-7232-aeb2-37cc6fb83b05",
  type: "page-type/multi-relation-property",
  slug: "turn-lore",
  propertySlug: "lore",
  definition: "the lore the world builder landed for a played turn",
  targetPageType: "page-type/lore",
  types: "ts",
} as const satisfies MultiRelationProperty
