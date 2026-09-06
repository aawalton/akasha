import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type HealthSamples = "jsonl"

export const healthSamples = {
  id: "01a060fb-0410-765e-a968-4c9a3477760a",
  pageTypeSlug: "page-property-entry",
  slug: "health-samples",
  propertySlug: "health-samples",
  definition: "every measurement Alan's phone took whose stretch began on a day, one to a line",
  properties: [
    { pagePropertySlug: "number-property/seq", required: true, many: false },
    { pagePropertySlug: "text-property/metric", required: true, many: false },
    { pagePropertySlug: "instant-property/started-at", required: true, many: false },
    { pagePropertySlug: "instant-property/ended-at", required: true, many: false },
    { pagePropertySlug: "number-property/value", required: true, many: false },
    { pagePropertySlug: "text-property/unit", required: true, many: false },
    { pagePropertySlug: "text-property/source-name", required: true, many: false },
    { pagePropertySlug: "instant-property/arrived-at", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
