import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Telling = ModulePropertyGroupCeilings

export const telling = {
  id: "01a08df6-4018-7bb3-8b4c-38ed791d69e6",
  type: "page-type/module-property-group",
  slug: "telling",
  propertySlug: "telling",
  definition: "what writes the settings an agent harness is told",
  createdAt: "2026-09-11T00:55:20.856Z",
  updatedAt: "2026-09-15T17:32:01.000Z",
} as const satisfies ModulePropertyGroup
