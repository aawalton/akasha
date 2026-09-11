import type { NamedFolderProperty } from "akasha/pages/named-folder-properties/named-folder-property.page-type.types.ts"

export const addonDdsFolder = {
  id: "01a0912b-050b-7d70-937b-978aad350dae",
  type: "named-folder-property",
  slug: "addon-dds-folder",
  propertySlug: "addon-dds-folder",
  definition: "the textures an add-on keeps in a folder named DDS",
  folderName: "DDS",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedFolderProperty
