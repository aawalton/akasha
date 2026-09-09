import type { ProcessProperty } from "@akasha/pages/process-property"

export type ProxyProcess = string

export const proxyProcess = {
  id: "01a0540c-dbc0-7126-8156-3157f3aed738",
  pageTypeSlug: "process-property",
  type: "process-property",
  slug: "proxy-process",
  propertySlug: "process",
  definition: "the process serving a seat its model calls",
} as const satisfies ProcessProperty
