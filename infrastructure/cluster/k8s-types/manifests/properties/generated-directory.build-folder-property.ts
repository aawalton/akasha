import type { BuildFolderProperty } from "akasha/pages/build-folder-properties/build-folder-property.page-type.types.ts"

export type GeneratedDirectory = true

export const generatedDirectory = {
  id: "01a081f3-600c-7716-9f7f-3de640dd8b05",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "generated-directory",
  propertySlug: "generated-directory",
  definition: "the YAML a synth writes from a manifest",
  folderName: "generated",
} as const satisfies BuildFolderProperty
