import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Sessions = "jsonl"

export const sessions = {
  id: "01a05fd8-c30f-799b-aa06-004072744b31",
  pageTypeSlug: "page-property-entry",
  slug: "sessions",
  propertySlug: "sessions",
  definition: "every stretch of time a day was spent in, one to a line",
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "start-time", required: true, many: false },
    { pagePropertySlug: "end-time", required: false, many: false },
    { pagePropertySlug: "daily-tracking", required: true, many: false },
    { pagePropertySlug: "safety-level", required: false, many: false },
    { pagePropertySlug: "difficulty-level", required: false, many: false },
    { pagePropertySlug: "version", required: false, many: false },
    { pagePropertySlug: "capacity-rate", required: false, many: false },
    { pagePropertySlug: "relationships", required: false, many: false },
    { pagePropertySlug: "asserted-at", required: false, many: false },
    { pagePropertySlug: "owner", required: false, many: false },
    { pagePropertySlug: "breathing-sets", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A question about a stretch is identified by a mark minted when the row is written.",
    },
    {
      invariantKind: "departure",
      statement: "A question about a stretch is never identified by that stretch's title.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch carrying no end is the stretch running now.",
    },
    {
      invariantKind: "gap",
      statement: "A stretch is a row here rather than a page a query may ask of.",
    },
  ],
} as const satisfies PagePropertyEntry
