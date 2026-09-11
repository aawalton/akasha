import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const runsOnWrite = {
  id: "01a04f56-55c4-7002-abdd-9a2cdc30e5bf",
  type: "boolean-property",
  slug: "runs-on-write",
  propertySlug: "runs-on-write",
  definition: "whether a change is refused where this warrant is unanswered",
  types: "ts",
} as const satisfies BooleanProperty
