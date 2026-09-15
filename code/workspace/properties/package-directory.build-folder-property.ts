import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const packageDirectory = {
  id: "01a081f6-dac2-707f-b072-c50aa44dd090",
  type: "page-type/build-folder-property",
  slug: "package-directory",
  propertySlug: "package-directory",
  definition: "the packages a package manager installs into a workspace",
  folderName: "node_modules",
  types: "ts",
} as const satisfies BuildFolderProperty
