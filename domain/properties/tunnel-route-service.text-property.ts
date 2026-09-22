import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const tunnelRouteService = {
  id: "01a0c68b-c03e-7b32-ae65-77d4156a2f71",
  type: "page-type/text-property",
  slug: "tunnel-route-service",
  propertySlug: "service",
  definition: "the address inside the cluster a tunnel route is answered at",
  maxLength: 253,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
