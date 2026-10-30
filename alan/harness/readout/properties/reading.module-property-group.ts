import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Reading = ModulePropertyGroupCeilings

export const reading = {
  id: "01a09b3f-922b-7d22-9964-602fe4969e03",
  type: "page-type/module-property-group",
  slug: "reading",
  propertySlug: "reading",
  definition: "the code that takes a readout's own number",
  createdAt: "2026-09-13T14:50:29.803Z",
  updatedAt: "2026-10-30T16:10:06.346Z",
} as const satisfies ModulePropertyGroup
