import type { BuildFolderProperty } from "akasha/pages/build-folder-properties/build-folder-property.page-type.types.ts"

export type DeclarationDirectory = true

export const declarationDirectory = {
  id: "01a081f1-3310-77e6-abb9-87b73af53a3f",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "declaration-directory",
  propertySlug: "declaration-directory",
  definition: "the type declarations a compile writes for an app",
  folderName: "dist",
} as const satisfies BuildFolderProperty
