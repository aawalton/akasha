import type { FileProperty } from "@akasha/pages/file-property"

export type Recipe = "dockerfile"

export const recipe = {
  id: "01a06815-9efd-7004-9d6a-efd331d652ce",
  pageTypeSlug: "file-property",
  slug: "recipe",
  propertySlug: "recipe",
  definition: "the steps an image is built by",
  fileName: "Containerfile",
} as const satisfies FileProperty
