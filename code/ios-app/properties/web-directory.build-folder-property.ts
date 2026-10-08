import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const webDirectory = {
  id: "01a081e3-8b05-7a54-8350-4ca2ec54dd1a",
  type: "page-type/build-folder-property",
  slug: "web-directory",
  propertySlug: "web-directory",
  definition: "the site a build makes for an app",
  folderName: "www",
  generated: true,
  types: "ts",
  createdAt: "2026-09-08T16:39:28.261Z",
  updatedAt: "2026-09-15T16:02:23.000Z",
} as const satisfies BuildFolderProperty
