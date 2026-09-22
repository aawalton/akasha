import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const tunnelRouteHostname = {
  id: "01a0c68b-b05b-7a7d-a758-3c544a291301",
  type: "page-type/text-property",
  slug: "tunnel-route-hostname",
  propertySlug: "hostname",
  definition: "the host name a tunnel route answers from outside the cluster",
  maxLength: 253,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
