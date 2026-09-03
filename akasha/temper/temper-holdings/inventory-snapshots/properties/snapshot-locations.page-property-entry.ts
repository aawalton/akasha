import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type SnapshotLocations = "jsonl"

export const snapshotLocations = {
  id: "01a0675a-f185-70ca-b3c9-47a893495e70",
  pageTypeSlug: "page-property-entry",
  slug: "snapshot-locations",
  propertySlug: "locations",
  definition: "what each bag holder was named and when it was last read, one holder to a line",
  properties: [
    { pagePropertySlug: "location-id", required: true, many: false },
    { pagePropertySlug: "eso-display-name", required: true, many: false },
    { pagePropertySlug: "last-scanned-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one bag holder a reading found.",
    },
    {
      invariantKind: "departure",
      statement:
        "When a holder was last read is the holder's own moment rather than the reading's.",
    },
  ],
} as const satisfies PagePropertyEntry
