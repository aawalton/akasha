import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type RunsOnWrite = boolean

export const runsOnWrite = {
  id: "01a04f56-55c4-7002-abdd-9a2cdc30e5bf",
  pageTypeSlug: "boolean-property",
  slug: "runs-on-write",
  propertySlug: "runs-on-write",
  definition: "whether a change is refused where this warrant is unanswered",
} as const satisfies BooleanProperty
