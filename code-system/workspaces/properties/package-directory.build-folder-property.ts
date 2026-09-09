import type { BuildFolderProperty } from "@akasha/pages/build-folder-property"

export type PackageDirectory = true

export const packageDirectory = {
  id: "01a081f6-dac2-707f-b072-c50aa44dd090",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "package-directory",
  propertySlug: "package-directory",
  definition: "the packages a package manager installs into a workspace",
  folderName: "node_modules",
} as const satisfies BuildFolderProperty
