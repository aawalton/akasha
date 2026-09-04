import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type HealthSamples = "jsonl"

export const healthSamples = {
  id: "01a060fb-0410-765e-a968-4c9a3477760a",
  pageTypeSlug: "page-property-entry",
  slug: "health-samples",
  propertySlug: "health-samples",
  definition: "every measurement Alan's phone took whose stretch began on a day, one to a line",
  properties: [
    { pagePropertySlug: "seq", required: true, many: false },
    { pagePropertySlug: "metric", required: true, many: false },
    { pagePropertySlug: "started-at", required: true, many: false },
    { pagePropertySlug: "ended-at", required: true, many: false },
    { pagePropertySlug: "value", required: true, many: false },
    { pagePropertySlug: "unit", required: true, many: false },
    { pagePropertySlug: "source-name", required: true, many: false },
    { pagePropertySlug: "arrived-at", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
