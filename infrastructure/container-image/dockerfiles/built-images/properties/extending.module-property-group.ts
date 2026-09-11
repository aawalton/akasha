import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-groups/module-property-group.page-type.types.ts"

export type Extending = ModulePropertyGroupCeilings

export const extending = {
  id: "01a08dee-4b1d-7cc8-8364-8cae5b4625ec",
  type: "module-property-group",
  slug: "extending",
  propertySlug: "extending",
  definition: "what writes an image's addition to the Dockerfile written for it",
} as const satisfies ModulePropertyGroup
