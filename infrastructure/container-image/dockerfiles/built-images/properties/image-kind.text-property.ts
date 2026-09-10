import type { TextProperty } from "@akasha/pages/text-property"

export type ImageKind = "nextjs" | "bun-service" | "tool-image"

export const imageKind = {
  id: "01a08193-7355-71ba-87d6-55a66969775c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "image-kind",
  propertySlug: "kind",
  definition: "the sort of Dockerfile written for an image",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
