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
  createdAt: "2026-09-11T15:42:36.074Z",
  updatedAt: "2026-09-15T16:02:23.000Z",
} as const satisfies BuildFolderProperty
