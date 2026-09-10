import type { ModulePropertyGroupCeilings } from "akasha/code-system/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code-system/module-property-groups/module-property-group.page-type.types.ts"

export type Check = ModulePropertyGroupCeilings

export const check = {
  id: "01a087bc-94bc-75f5-ba41-03165ee04f85",
  pageTypeSlug: "module-property-group",
  type: "module-property-group",
  slug: "check",
  propertySlug: "check",
  definition: "what judges the change a landing carries",
} as const satisfies ModulePropertyGroup
