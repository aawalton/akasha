import type { ProcessProperty } from "akasha/page/process-property/process-property.page-type.types.ts"

export const gatewayProcess = {
  id: "01a0540c-dbc0-7126-8156-3157f3aed738",
  type: "page-type/process-property",
  slug: "gateway-process",
  propertySlug: "process",
  definition: "the process that calls the model for a seat",
  types: "ts",
  createdAt: "2026-08-30T19:02:03.968Z",
  updatedAt: "2026-09-25T18:06:08.000Z",
} as const satisfies ProcessProperty
