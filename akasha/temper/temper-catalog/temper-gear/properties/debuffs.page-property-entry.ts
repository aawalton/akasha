import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Debuffs = "jsonl"

export const debuffs = {
  id: "01a05fd1-d439-7d5b-adf7-00773d945178",
  pageTypeSlug: "page-property-entry",
  slug: "debuffs",
  propertySlug: "debuffs",
  definition: "the harmful effects a thing inflicts, one to a line",
  properties: [
    { pagePropertySlug: "debuff-id", required: true, many: false },
    { pagePropertySlug: "effect-seconds", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
