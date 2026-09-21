import type { NamedFolderProperty } from "akasha/page/named-folder-property/named-folder-property.page-type.types.ts"

export const addonArtFolder = {
  id: "01a0912b-162b-7542-8bb9-54e99fb9fbf8",
  type: "page-type/named-folder-property",
  slug: "addon-art-folder",
  propertySlug: "addon-art-folder",
  definition: "the artwork an add-on keeps in a folder named art",
  folderName: "art",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedFolderProperty
