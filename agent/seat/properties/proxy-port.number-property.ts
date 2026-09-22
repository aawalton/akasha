import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const proxyPort = {
  id: "01a0540c-dbc1-7e12-97c6-dfe28195841a",
  type: "page-type/number-property",
  slug: "proxy-port",
  propertySlug: "port",
  definition: "a seat's port to its model",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
