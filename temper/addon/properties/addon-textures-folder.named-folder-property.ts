import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export type AddonTexturesFolder = true

export const addonTexturesFolder = {
  id: "01a0de5e-f1f3-78d3-915e-4e622a398a8b",
  type: "page-type/named-folder-property",
  slug: "addon-textures-folder",
  propertySlug: "addon-textures-folder",
  definition: "the textures an add-on keeps in a folder named textures",
  folderName: "textures",
  holdsBytes: true,
  runsFileLength: false,
} as const satisfies NamedFolderProperty
