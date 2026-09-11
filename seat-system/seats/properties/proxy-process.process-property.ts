import type { ProcessProperty } from "akasha/pages/process-properties/process-property.page-type.types.ts"

export const proxyProcess = {
  id: "01a0540c-dbc0-7126-8156-3157f3aed738",
  type: "process-property",
  slug: "proxy-process",
  propertySlug: "process",
  definition: "the process serving a seat its model calls",
  types: "ts",
} as const satisfies ProcessProperty
