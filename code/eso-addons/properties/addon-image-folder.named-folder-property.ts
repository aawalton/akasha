import type { NamedFolderProperty } from "akasha/pages/named-folder-properties/named-folder-property.page-type.types.ts"

export const addonImageFolder = {
  id: "01a0912b-276d-729f-9013-7b15786d6486",
  type: "named-folder-property",
  slug: "addon-image-folder",
  propertySlug: "addon-image-folder",
  definition: "the images an add-on keeps in a folder named image",
  folderName: "image",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedFolderProperty
