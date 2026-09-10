import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type FolderShapeEnabled = boolean

export const folderShapeEnabled = {
  id: "01a05f20-6106-7b70-8c02-ce53357b4835",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "folder-shape-enabled",
  propertySlug: "enabled",
  definition: "whether a shape judges folders",
} as const satisfies BooleanProperty
