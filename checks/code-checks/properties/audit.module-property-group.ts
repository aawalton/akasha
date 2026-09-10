import type { ModulePropertyGroup } from "akasha/code-system/module-property-groups/module-property-group.page-type.types.ts"

export const audit = {
  id: "01a087bc-a4e8-79e9-aebb-43085dc35075",
  pageTypeSlug: "module-property-group",
  type: "module-property-group",
  slug: "audit",
  propertySlug: "audit",
  definition: "what judges the whole repository at once",
} as const satisfies ModulePropertyGroup
