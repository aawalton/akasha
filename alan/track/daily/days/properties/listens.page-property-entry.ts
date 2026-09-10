import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Listens = "jsonl"

export const listens = {
  id: "01a06240-340f-7001-ad7b-818302ce884a",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "listens",
  propertySlug: "listens",
  definition: "every play Alan finished on a day, one to a line",
  parts: [
    "boolean-property/first-listen",
    "number-property/minutes",
    "number-property/new-music-minutes",
    "text-property/play-key",
  ],
  properties: [
    { pageProperty: "text-property/play-key", required: true, many: false },
    { pageProperty: "text-property/spotify-track-id", required: true, many: false },
    { pageProperty: "instant-property/played-at", required: true, many: false },
    { pageProperty: "text-property/track-name", required: false, many: false },
    { pageProperty: "text-property/artist-name", required: false, many: false },
    { pageProperty: "number-property/minutes", required: false, many: false },
    { pageProperty: "boolean-property/first-listen", required: false, many: false },
    { pageProperty: "number-property/new-music-minutes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A play key names a single listen.",
    },
    {
      invariantKind: "absence",
      statement: "An ESO day without listening carries no listens file.",
    },
    {
      invariantKind: "absence",
      statement: "A listen names no persona.",
    },
  ],
} as const satisfies PagePropertyEntry
