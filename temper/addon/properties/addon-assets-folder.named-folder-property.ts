import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export type AddonAssetsFolder = true

export const addonAssetsFolder = {
  id: "01a0de7f-b8c3-7fe9-b2a9-98be85b849e1",
  type: "page-type/named-folder-property",
  slug: "addon-assets-folder",
  propertySlug: "addon-assets-folder",
  definition: "the textures an add-on keeps in a folder named assets",
  folderName: "assets",
  holdsBytes: true,
  runsFileLength: false,
} as const satisfies NamedFolderProperty
