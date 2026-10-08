import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const addonImageFolder = {
  id: "01a0912b-276d-729f-9013-7b15786d6486",
  type: "page-type/named-folder-property",
  slug: "addon-image-folder",
  propertySlug: "addon-image-folder",
  definition: "the images an add-on keeps in a folder named image",
  folderName: "image",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
  createdAt: "2026-09-11T15:51:59.597Z",
  updatedAt: "2026-09-21T16:29:38.000Z",
} as const satisfies NamedFolderProperty
