import type { BuildFolderProperty } from "@akasha/pages/build-folder-property"

export type BundleDirectory = true

export const bundleDirectory = {
  id: "01a081f2-0426-731b-890a-130c17caa4ac",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "bundle-directory",
  propertySlug: "bundle-directory",
  definition: "the client and server bundles a build makes for an app",
  folderName: "build",
} as const satisfies BuildFolderProperty
