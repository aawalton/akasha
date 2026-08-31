import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type RunsOnAudit = boolean

export const runsOnAudit = {
  id: "01a04e28-c4b3-70c7-95e2-30175d337863",
  pageTypeSlug: "boolean-property",
  slug: "runs-on-audit",
  propertySlug: "runs-on-audit",
  definition: "whether a check judges every page at audit",
} as const satisfies BooleanProperty
