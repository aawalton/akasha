import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const imageKind = {
  id: "01a08193-7355-71ba-87d6-55a66969775c",
  type: "page-type/select-property",
  slug: "image-kind",
  propertySlug: "kind",
  definition: "the sort of Dockerfile written for an image",
  values: ["nextjs", "bun-service", "tool-image"],
  types: "ts",
  createdAt: "2026-09-08T15:11:59.317Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
