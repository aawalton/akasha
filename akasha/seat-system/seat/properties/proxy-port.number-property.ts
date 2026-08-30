import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type ProxyPort = number

export const proxyPort = {
  id: "01a0540c-dbc1-7e12-97c6-dfe28195841a",
  pageTypeSlug: "number-property",
  slug: "proxy-port",
  propertySlug: "port",
  definition: "the port a seat reaches its model through",
  max: null,
} as const satisfies NumberProperty
