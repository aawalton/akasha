import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const outputDirectory = {
  id: "01a09122-8e2a-7a30-9e08-9d4fe5a01cc9",
  type: "page-type/build-folder-property",
  slug: "output-directory",
  propertySlug: "output-directory",
  definition: "what a domain's build writes",
  folderName: "dist",
  generated: true,
  types: "ts",
} as const satisfies BuildFolderProperty
