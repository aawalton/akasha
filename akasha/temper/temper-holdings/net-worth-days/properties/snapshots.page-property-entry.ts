import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Snapshots = "jsonl"

export const snapshots = {
  id: "01a05fcb-fd34-7dae-90b4-e885dc27f734",
  pageTypeSlug: "page-property-entry",
  slug: "snapshots",
  propertySlug: "snapshots",
  definition: "what an account was worth, one reading to a line",
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "captured-at", required: true, many: false },
    { pagePropertySlug: "total-value", required: true, many: false },
    { pagePropertySlug: "gold-amount", required: false, many: false },
    { pagePropertySlug: "currency-gold-value", required: false, many: false },
    { pagePropertySlug: "item-value", required: false, many: false },
    { pagePropertySlug: "excluded-guild-bank-value", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry
