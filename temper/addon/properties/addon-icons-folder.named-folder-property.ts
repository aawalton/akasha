import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const addonIconsFolder = {
  id: "01a0912a-f2ee-78e2-8749-9541ed036613",
  type: "page-type/named-folder-property",
  slug: "addon-icons-folder",
  propertySlug: "addon-icons-folder",
  definition: "the icon textures an add-on keeps in a folder named Icons",
  folderName: "Icons",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
  createdAt: "2026-09-11T15:51:46.158Z",
  updatedAt: "2026-09-21T16:29:38.000Z",
} as const satisfies NamedFolderProperty
