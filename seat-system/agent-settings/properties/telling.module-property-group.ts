import type { ModulePropertyGroupCeilings } from "akasha/code-system/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code-system/module-property-groups/module-property-group.page-type.types.ts"

export type Telling = ModulePropertyGroupCeilings

export const telling = {
  id: "01a08df6-4018-7bb3-8b4c-38ed791d69e6",
  pageTypeSlug: "module-property-group",
  type: "module-property-group",
  slug: "telling",
  propertySlug: "telling",
  definition: "what writes the settings an agent harness is told",
} as const satisfies ModulePropertyGroup
