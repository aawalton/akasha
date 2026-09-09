import type { NumberProperty } from "@akasha/pages/number-property"

export type ProxyPort = number

export const proxyPort = {
  id: "01a0540c-dbc1-7e12-97c6-dfe28195841a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "proxy-port",
  propertySlug: "port",
  definition: "the port a seat reaches its model through",
  max: null,
} as const satisfies NumberProperty
