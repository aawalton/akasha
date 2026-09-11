import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const imageKind = {
  id: "01a08193-7355-71ba-87d6-55a66969775c",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "image-kind",
  propertySlug: "kind",
  definition: "the sort of Dockerfile written for an image",
  values: ["nextjs", "bun-service", "tool-image"],
  types: "ts",
} as const satisfies SelectProperty
