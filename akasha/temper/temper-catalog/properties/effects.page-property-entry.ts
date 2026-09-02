import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Effects = "jsonl"

export const effects = {
  id: "01a05fb0-3ceb-742c-998f-6122c9954a30",
  pageTypeSlug: "page-property-entry",
  slug: "effects",
  propertySlug: "effects",
  definition: "what a thing does, one metric it moves to a line",
  properties: [
    { pagePropertySlug: "metric-id", required: true, many: false },
    { pagePropertySlug: "effect-type", required: true, many: false },
    { pagePropertySlug: "effect-value", required: true, many: false },
    { pagePropertySlug: "effect-seconds", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry
