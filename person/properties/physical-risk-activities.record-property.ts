import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const physicalRiskActivities = {
  id: "01a183b8-e34c-7581-b17a-97d5f465cffb",
  type: "page-type/record-property",
  slug: "physical-risk-activities",
  propertySlug: "physical-risk-activities",
  definition: "the activities carrying physical risk that a person does, one activity at a time",
  properties: [
    { pageProperty: "text-property/risk-activity-name", required: true, many: false },
    { pageProperty: "number-property/risk-activity-times-per-year", required: false, many: false },
    { pageProperty: "text-property/risk-activity-note", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:14:54.539Z",
  updatedAt: "2026-10-28T18:14:54.539Z",
} as const satisfies RecordProperty
