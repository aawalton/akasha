import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const bundleDirectory = {
  id: "01a081f2-0426-731b-890a-130c17caa4ac",
  type: "page-type/build-folder-property",
  slug: "bundle-directory",
  propertySlug: "bundle-directory",
  definition: "the client and server bundles a build makes for an app",
  folderName: "build",
  generated: true,
  types: "ts",
} as const satisfies BuildFolderProperty
