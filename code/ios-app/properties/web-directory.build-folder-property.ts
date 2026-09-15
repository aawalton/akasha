import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const webDirectory = {
  id: "01a081e3-8b05-7a54-8350-4ca2ec54dd1a",
  type: "page-type/build-folder-property",
  slug: "web-directory",
  propertySlug: "web-directory",
  definition: "the site a build makes for an app",
  folderName: "www",
  types: "ts",
} as const satisfies BuildFolderProperty
