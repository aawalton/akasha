import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const lastUsedAt = {
  id: "01a0d92e-0a63-7364-80dc-908542154a9e",
  type: "page-type/instant-property",
  slug: "last-used-at",
  propertySlug: "last-used-at",
  definition: "when a device secret was last presented and taken",
  types: "ts",
} as const satisfies InstantProperty
