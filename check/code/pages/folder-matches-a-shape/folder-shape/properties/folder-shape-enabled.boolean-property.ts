import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const folderShapeEnabled = {
  id: "01a05f20-6106-7b70-8c02-ce53357b4835",
  type: "page-type/boolean-property",
  slug: "folder-shape-enabled",
  propertySlug: "enabled",
  definition: "whether a shape judges folders",
  types: "ts",
} as const satisfies BooleanProperty
