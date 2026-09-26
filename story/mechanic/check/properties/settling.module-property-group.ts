import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Settling = ModulePropertyGroupCeilings

export const settling = {
  id: "01a0de14-272d-7af8-9bfb-4c38964b6e91",
  type: "page-type/module-property-group",
  slug: "settling",
  propertySlug: "settling",
  definition: "what settles a declared action from a reading and the dice rolled for it",
} as const satisfies ModulePropertyGroup
