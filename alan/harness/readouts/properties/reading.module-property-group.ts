import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-groups/module-property-group.page-type.types.ts"

export type Reading = ModulePropertyGroupCeilings

export const reading = {
  id: "01a09b3f-922b-7d22-9964-602fe4969e03",
  type: "module-property-group",
  slug: "reading",
  propertySlug: "reading",
  definition: "what takes a readout's own reading",
} as const satisfies ModulePropertyGroup
