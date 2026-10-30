import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const listens = {
  id: "01a06240-340f-7001-ad7b-818302ce884a",
  type: "page-type/page-property-entry",
  slug: "listens",
  propertySlug: "listens",
  definition: "every time Alan hears a track on Spotify on a day",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A play key names a single listen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An ESO day without listening carries no listens file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A listen names no persona.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:12:49.935Z",
  updatedAt: "2026-10-30T16:38:26.033Z",
} as const satisfies PagePropertyEntry
