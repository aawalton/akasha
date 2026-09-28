import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const stepLore = {
  id: "01a0deaf-0e2e-7232-aeb2-37cc6fb83b05",
  type: "page-type/multi-relation-property",
  slug: "step-lore",
  propertySlug: "lore",
  definition: "the lore the world builder landed for a turn or a written chapter",
  targetPageType: "page-type/lore",
  types: "ts",
} as const satisfies MultiRelationProperty
