import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const addonIconsFolder = {
  id: "01a0912a-f2ee-78e2-8749-9541ed036613",
  type: "named-folder-property",
  slug: "addon-icons-folder",
  propertySlug: "addon-icons-folder",
  definition: "the icon textures an add-on keeps in a folder named Icons",
  folderName: "Icons",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedFolderProperty
