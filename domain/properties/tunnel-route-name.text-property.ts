import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const tunnelRouteName = {
  id: "01a0c68b-a04d-775e-bddf-207adf6b99e0",
  type: "page-type/text-property",
  slug: "tunnel-route-name",
  propertySlug: "name",
  definition: "what a tunnel route is called",
  maxLength: 63,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-22T00:37:14.445Z",
  updatedAt: "2026-09-22T00:49:17.000Z",
} as const satisfies TextProperty
