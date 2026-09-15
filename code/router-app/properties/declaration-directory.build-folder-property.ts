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
} as const satisfies BuildFolderProperty
