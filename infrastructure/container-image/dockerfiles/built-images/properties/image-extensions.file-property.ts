import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type ImageExtensions = "json"

export const imageExtensions = {
  id: "01a08193-9d88-705c-adc3-de707dd35845",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "image-extensions",
  propertySlug: "extensions",
  definition: "what an image adds to the Dockerfile written for it",
  runsFileLength: false,
} as const satisfies FileProperty
