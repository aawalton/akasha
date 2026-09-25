import type { ProcessProperty } from "akasha/page/process-property/process-property.page-type.types.ts"

export const supervisorProcess = {
  id: "01a05407-3d65-7188-930c-3dad28de1d4a",
  type: "page-type/process-property",
  slug: "supervisor-process",
  propertySlug: "supervisor-process",
  definition: "the process of a seat's supervisor",
  types: "ts",
} as const satisfies ProcessProperty
