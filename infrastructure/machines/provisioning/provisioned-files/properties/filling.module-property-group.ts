import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-groups/module-property-group.page-type.types.ts"

export type Filling = ModulePropertyGroupCeilings

export const filling = {
  id: "01a09109-acaa-71f6-acb1-e909d8ca9ab4",
  type: "module-property-group",
  slug: "filling",
  propertySlug: "filling",
  definition: "what writes the body of a provisioned file",
} as const satisfies ModulePropertyGroup
