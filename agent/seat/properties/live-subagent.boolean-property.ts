import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const liveSubagent = {
  id: "01a06cf1-d207-7e6e-bb56-4cd271b224b1",
  type: "boolean-property",
  slug: "live-subagent",
  propertySlug: "live-subagent",
  definition: "whether a subagent a seat dispatched has a turn still to come",
  types: "ts",
} as const satisfies BooleanProperty
