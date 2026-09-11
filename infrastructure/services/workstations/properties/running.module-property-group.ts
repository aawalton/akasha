import type { ModulePropertyGroupCeilings } from "akasha/code-system/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code-system/module-property-groups/module-property-group.page-type.types.ts"

export type Running = ModulePropertyGroupCeilings

export const running = {
  id: "01a0917c-bda7-752a-b5cf-3d8419423042",
  pageTypeSlug: "module-property-group",
  type: "module-property-group",
  slug: "running",
  propertySlug: "running",
  definition: "the code a workstation service runs",
} as const satisfies ModulePropertyGroup
