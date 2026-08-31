import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type AuditRuns = number

export const auditRuns = {
  id: "01a05911-aa1b-786e-9ce5-b43db6331e5b",
  pageTypeSlug: "number-property",
  slug: "audit-runs",
  propertySlug: "audit-runs",
  definition: "how many times an audit judges, unless it is asked for more",
  max: null,
} as const satisfies NumberProperty
