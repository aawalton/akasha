import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const packageDirectory = {
  id: "01a081f6-dac2-707f-b072-c50aa44dd090",
  type: "page-type/build-folder-property",
  slug: "package-directory",
  propertySlug: "package-directory",
  definition: "the packages a package manager installs into a workspace",
  folderName: "node_modules",
  types: "ts",
  createdAt: "2026-09-08T17:00:33.858Z",
  updatedAt: "2026-09-15T15:50:15.000Z",
} as const satisfies BuildFolderProperty
