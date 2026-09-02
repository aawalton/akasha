import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Quests = "jsonl"

export const quests = {
  id: "01a05fcd-f553-7ed3-91d3-7f2ba2527f00",
  pageTypeSlug: "page-property-entry",
  slug: "quests",
  propertySlug: "quests",
  definition: "every quest a sweep read out of the game, one quest to a line",
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "mined-at", required: true, many: false },
    { pagePropertySlug: "quest-id", required: true, many: false },
    { pagePropertySlug: "quest-type", required: true, many: false },
    { pagePropertySlug: "repeatable-type", required: true, many: false },
    { pagePropertySlug: "zone-id", required: true, many: false },
    { pagePropertySlug: "zone-name", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
