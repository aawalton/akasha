import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const baselineRates = {
  id: "01a183bf-b69f-7678-83fa-b109948e3e66",
  type: "page-type/record-property",
  slug: "baseline-rates",
  propertySlug: "baseline-rates",
  definition: "how often US males die of a cause in a year, one band of ages at a time",
  properties: [
    { pageProperty: "number-property/age-band-start", required: true, many: false },
    { pageProperty: "number-property/age-band-end", required: true, many: false },
    { pageProperty: "number-property/deaths-per-hundred-thousand", required: true, many: false },
    { pageProperty: "text-property/health-source-citation", required: true, many: false },
    { pageProperty: "url-property/health-source-url", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-28T18:22:21.854Z",
} as const satisfies RecordProperty
