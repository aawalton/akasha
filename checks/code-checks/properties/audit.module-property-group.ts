import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-groups/module-property-group.page-type.types.ts"

export type Audit = ModulePropertyGroupCeilings

export const audit = {
  id: "01a087bc-a4e8-79e9-aebb-43085dc35075",
  type: "module-property-group",
  slug: "audit",
  propertySlug: "audit",
  definition: "what judges the whole repository at once",
} as const satisfies ModulePropertyGroup
