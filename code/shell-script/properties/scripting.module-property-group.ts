import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Scripting = ModulePropertyGroupCeilings

export const scripting = {
  id: "01a08dbc-5e5e-7d69-b43c-041e701a0268",
  type: "page-type/module-property-group",
  slug: "scripting",
  propertySlug: "scripting",
  definition: "what writes the body of a shell script",
  createdAt: "2026-09-10T23:52:07.518Z",
  updatedAt: "2026-09-15T17:32:01.000Z",
} as const satisfies ModulePropertyGroup
