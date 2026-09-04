import type { BooleanProperty } from "../../../pages-system/boolean-properties/boolean-property.page-type.ts"

export type RunsChecks = boolean

export const runsChecks = {
  id: "01a05e19-7ffa-7929-bb78-9aadbdefcc15",
  pageTypeSlug: "boolean-property",
  slug: "runs-checks",
  propertySlug: "runs-checks",
  definition: "whether checks run on a change of this kind",
} as const satisfies BooleanProperty
