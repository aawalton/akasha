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
  createdAt: "2026-09-11T15:51:55.179Z",
  updatedAt: "2026-09-21T16:29:38.000Z",
} as const satisfies NamedFolderProperty
