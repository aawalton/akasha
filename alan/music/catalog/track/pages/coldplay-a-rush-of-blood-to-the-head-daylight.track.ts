import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadDaylight = {
  id: "01a0b9ee-e842-7b37-8f5a-f21957f01c4e",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-daylight",
  ownLength: 5.463333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fP4xTSBli3tKck172LEZ4",
      externalLink: "https://open.spotify.com/track/4fP4xTSBli3tKck172LEZ4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daylight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "daylight|4gzpq5DPGxSnKTe4SA8HAU|327800",
  song: "song/coldplay-daylight",
} as const satisfies Track
