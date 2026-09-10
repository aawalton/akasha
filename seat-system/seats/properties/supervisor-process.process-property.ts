import type { ProcessProperty } from "akasha/pages/process-properties/process-property.page-type.types.ts"

export const supervisorProcess = {
  id: "01a05407-3d65-7188-930c-3dad28de1d4a",
  pageTypeSlug: "process-property",
  type: "process-property",
  slug: "supervisor-process",
  propertySlug: "supervisor-process",
  definition: "the process keeping a seat filled",
  types: "ts",
} as const satisfies ProcessProperty
