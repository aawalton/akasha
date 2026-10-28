import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const riskFactors = {
  id: "01a183bf-b6a1-759f-a922-0ec5b86d0856",
  type: "page-type/record-property",
  slug: "risk-factors",
  propertySlug: "risk-factors",
  definition: "the things that raise or lower the risk of a cause of death, one at a time",
  properties: [
    { pageProperty: "text-property/risk-factor-name", required: true, many: false },
    { pageProperty: "text-property/risk-factor-person-property", required: true, many: false },
    { pageProperty: "text-property/risk-factor-applied-as", required: true, many: false },
    { pageProperty: "number-property/relative-risk-low", required: true, many: false },
    { pageProperty: "number-property/relative-risk-central", required: true, many: false },
    { pageProperty: "number-property/relative-risk-high", required: true, many: false },
    { pageProperty: "text-property/health-source-citation", required: true, many: false },
    { pageProperty: "url-property/health-source-url", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-28T18:22:21.854Z",
} as const satisfies RecordProperty
