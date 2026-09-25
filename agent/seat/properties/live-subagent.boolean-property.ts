import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const liveSubagent = {
  id: "01a06cf1-d207-7e6e-bb56-4cd271b224b1",
  type: "page-type/boolean-property",
  slug: "live-subagent",
  propertySlug: "live-subagent",
  definition: "whether a seat has a subagent that runs",
  types: "ts",
} as const satisfies BooleanProperty
