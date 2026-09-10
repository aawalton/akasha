import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const auditRuns = {
  id: "01a05911-aa1b-786e-9ce5-b43db6331e5b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "audit-runs",
  propertySlug: "audit-runs",
  definition: "how many times an audit judges, unless it is asked for more",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
