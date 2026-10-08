import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const declarationDirectory = {
  id: "01a081f1-3310-77e6-abb9-87b73af53a3f",
  type: "page-type/build-folder-property",
  slug: "declaration-directory",
  propertySlug: "declaration-directory",
  definition: "the type declarations a compile writes for an app",
  folderName: "dist",
  generated: true,
  types: "ts",
  createdAt: "2026-09-08T16:54:23.248Z",
  updatedAt: "2026-09-15T16:02:23.000Z",
} as const satisfies BuildFolderProperty
