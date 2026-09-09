import type { BuildFolderProperty } from "@akasha/pages/build-folder-property"

export type WebDirectory = true

export const webDirectory = {
  id: "01a081e3-8b05-7a54-8350-4ca2ec54dd1a",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "web-directory",
  propertySlug: "web-directory",
  definition: "the site a build makes for an app",
  folderName: "www",
} as const satisfies BuildFolderProperty
