import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Decision = ModulePropertyGroupCeilings

export const decision = {
  id: "01a087bc-84ce-73d2-b128-2ef1ceab288d",
  type: "page-type/module-property-group",
  slug: "decision",
  propertySlug: "decision",
  definition: "the code by which a check and an audit both judge",
} as const satisfies ModulePropertyGroup
