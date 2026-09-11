import type { NamedFolderProperty } from "akasha/pages/named-folder-properties/named-folder-property.page-type.types.ts"

export const addonBinFolder = {
  id: "01a0912b-3b04-79e0-b715-2decfbfcdc83",
  type: "named-folder-property",
  slug: "addon-bin-folder",
  propertySlug: "addon-bin-folder",
  definition: "the textures an add-on keeps under a folder named bin",
  folderName: "bin",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedFolderProperty
