import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type HealthSamples = "jsonl"

export const healthSamples = {
  id: "01a060fb-0410-765e-a968-4c9a3477760a",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "health-samples",
  propertySlug: "health-samples",
  definition: "every measurement Alan's phone took whose stretch began on a day, one to a line",
  parts: [
    "instant-property/arrived-at",
    "instant-property/ended-at",
    "instant-property/started-at",
    "number-property/value",
    "text-property/source-name",
  ],
  properties: [
    { pageProperty: "number-property/seq", required: true, many: false },
    { pageProperty: "text-property/metric", required: true, many: false },
    { pageProperty: "instant-property/started-at", required: true, many: false },
    { pageProperty: "instant-property/ended-at", required: true, many: false },
    { pageProperty: "number-property/value", required: true, many: false },
    { pageProperty: "text-property/unit", required: true, many: false },
    { pageProperty: "text-property/source-name", required: true, many: false },
    { pageProperty: "instant-property/arrived-at", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
