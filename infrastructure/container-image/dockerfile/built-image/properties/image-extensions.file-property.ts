import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const imageExtensions = {
  id: "01a08193-9d88-705c-adc3-de707dd35845",
  type: "page-type/file-property",
  slug: "image-extensions",
  propertySlug: "extensions",
  definition: "what an image adds to the Dockerfile written for it",
  extensions: ["json"],
  writtenBy: "module-property-group/extending",
  runsFileLength: false,
  types: "ts",
  createdAt: "2026-09-08T15:12:10.120Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
