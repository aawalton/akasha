import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const runsOnAudit = {
  id: "01a04e28-c4b3-70c7-95e2-30175d337863",
  type: "page-type/boolean-property",
  slug: "runs-on-audit",
  propertySlug: "runs-on-audit",
  definition: "whether a check judges every page at audit",
  types: "ts",
  createdAt: "2026-08-29T15:34:49.779Z",
  updatedAt: "2026-09-15T15:59:02.000Z",
} as const satisfies BooleanProperty
