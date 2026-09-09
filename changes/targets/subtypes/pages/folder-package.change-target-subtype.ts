import type { ChangeTargetSubtype } from "../change-target-subtype.page-type.ts"

export const folderPackage = {
  id: "01a07c7a-711a-7aa6-8c17-9a7e184b842e",
  pageTypeSlug: "change-target-subtype",
  type: "change-target-subtype",
  slug: "folder-package",
  definition: "a folder with a workspace package",
  changeTargetType: "change-target-type/folder",
  parent: "change-target-subtype/folder",
} as const satisfies ChangeTargetSubtype
