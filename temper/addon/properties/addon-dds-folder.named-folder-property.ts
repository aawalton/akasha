import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const addonDdsFolder = {
  id: "01a0912b-050b-7d70-937b-978aad350dae",
  type: "page-type/named-folder-property",
  slug: "addon-dds-folder",
  propertySlug: "addon-dds-folder",
  definition: "the textures an add-on keeps in a folder named DDS",
  folderName: "DDS",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
  createdAt: "2026-09-11T15:51:50.795Z",
  updatedAt: "2026-09-21T16:29:38.000Z",
} as const satisfies NamedFolderProperty
