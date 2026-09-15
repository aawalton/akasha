import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOnlyTimeOnlyTime = {
  id: "01a0a5b0-245a-7e2b-8176-5c512e15234e",
  type: "page-type/track",
  slug: "enya-only-time-only-time",
  ownLength: 3.628,
  ownProgress: 0,
  partOfCollections: ["release/enya-only-time"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0prw5XSbHLmKsctDEdeBuA",
      externalLink: "https://open.spotify.com/track/0prw5XSbHLmKsctDEdeBuA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Only Time",
} as const satisfies Track
