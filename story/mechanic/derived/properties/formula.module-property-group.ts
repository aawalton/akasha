import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Formula = ModulePropertyGroupCeilings

export const formula = {
  id: "01a0ca33-195e-7989-9f83-c13317ffc1ff",
  type: "page-type/module-property-group",
  slug: "formula",
  propertySlug: "formula",
  definition: "what works a derived number out from the numbers a character keeps",
} as const satisfies ModulePropertyGroup
