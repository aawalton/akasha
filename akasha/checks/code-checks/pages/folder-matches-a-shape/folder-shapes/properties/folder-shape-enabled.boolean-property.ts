import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type FolderShapeEnabled = boolean

export const folderShapeEnabled = {
  id: "01a05f20-6106-7b70-8c02-ce53357b4835",
  pageTypeSlug: "boolean-property",
  slug: "folder-shape-enabled",
  propertySlug: "enabled",
  definition: "whether a shape judges folders",
} as const satisfies BooleanProperty
