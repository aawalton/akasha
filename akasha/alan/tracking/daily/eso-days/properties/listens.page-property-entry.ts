import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Listens = "jsonl"

export const listens = {
  id: "01a06240-340f-7001-ad7b-818302ce884a",
  pageTypeSlug: "page-property-entry",
  slug: "listens",
  propertySlug: "listens",
  definition: "every play Alan finished on a day, one to a line",
  partSlugs: [
    "boolean-property/first-listen",
    "instant-property/played-at",
    "number-property/minutes",
    "number-property/new-music-minutes",
    "text-property/play-key",
  ],
  properties: [
    { pagePropertySlug: "play-key", required: true, many: false },
    { pagePropertySlug: "spotify-track-id", required: true, many: false },
    { pagePropertySlug: "played-at", required: true, many: false },
    { pagePropertySlug: "track-name", required: false, many: false },
    { pagePropertySlug: "artist-name", required: false, many: false },
    { pagePropertySlug: "minutes", required: false, many: false },
    { pagePropertySlug: "first-listen", required: false, many: false },
    { pagePropertySlug: "new-music-minutes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A play key names one listen and no other.",
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
