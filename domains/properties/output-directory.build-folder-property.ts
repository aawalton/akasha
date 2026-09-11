import type { BuildFolderProperty } from "akasha/pages/build-folder-properties/build-folder-property.page-type.types.ts"

export const outputDirectory = {
  id: "01a09122-8e2a-7a30-9e08-9d4fe5a01cc9",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "output-directory",
  propertySlug: "output-directory",
  definition: "what a domain's build writes",
  folderName: "dist",
  types: "ts",
} as const satisfies BuildFolderProperty
