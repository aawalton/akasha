import type { ProcessProperty } from "../../../pages-system/process-property/process-property.page-type.ts"

export type SupervisorProcess = string

export const supervisorProcess = {
  id: "01a05407-3d65-7188-930c-3dad28de1d4a",
  pageTypeSlug: "process-property",
  slug: "supervisor-process",
  propertySlug: "supervisor-process",
  definition: "the process keeping a seat filled",
} as const satisfies ProcessProperty
