import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const imageExtensions = {
  id: "01a08193-9d88-705c-adc3-de707dd35845",
  type: "file-property",
  slug: "image-extensions",
  propertySlug: "extensions",
  definition: "what an image adds to the Dockerfile written for it",
  extensions: ["json"],
  writtenBy: "module-property-group/extending",
  runsFileLength: false,
  types: "ts",
} as const satisfies FileProperty
