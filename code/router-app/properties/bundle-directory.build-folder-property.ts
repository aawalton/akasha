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
  createdAt: "2026-09-08T16:55:16.774Z",
  updatedAt: "2026-09-15T16:02:23.000Z",
} as const satisfies BuildFolderProperty
