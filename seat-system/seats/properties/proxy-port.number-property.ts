import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const proxyPort = {
  id: "01a0540c-dbc1-7e12-97c6-dfe28195841a",
  type: "number-property",
  slug: "proxy-port",
  propertySlug: "port",
  definition: "the port a seat reaches its model through",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
