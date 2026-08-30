import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type ProxyPort = number

export const proxyPort = {
  id: "01a05035-2609-723d-b896-efc36f852008",
  pageTypeSlug: "number-property",
  slug: "proxy-port",
  definition: "the port a seat reaches its model through",
  max: null,
} as const satisfies NumberProperty
