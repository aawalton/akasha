import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Decision = ModulePropertyGroupCeilings

export const decision = {
  id: "01a087bc-84ce-73d2-b128-2ef1ceab288d",
  type: "page-type/module-property-group",
  slug: "decision",
  propertySlug: "decision",
  definition: "the code by which a check and an audit both judge",
  createdAt: "2026-09-09T19:54:34.062Z",
  updatedAt: "2026-09-22T14:08:17.000Z",
} as const satisfies ModulePropertyGroup
