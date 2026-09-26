import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const upscaleResolution = {
  id: "01a0de80-955e-7dbe-a10d-c076498e9fb6",
  type: "page-type/text-property",
  slug: "upscale-resolution",
  propertySlug: "resolution",
  definition: "the resolution an upscale was asked to reach, in pixels or as a factor",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
