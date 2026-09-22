import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Composing = ModulePropertyGroupCeilings

export const composing = {
  id: "01a08d8d-e25a-7488-b77c-dc6aa4248ffb",
  type: "page-type/module-property-group",
  slug: "composing",
  propertySlug: "composing",
  definition: "what composes the steps building a container image",
} as const satisfies ModulePropertyGroup
