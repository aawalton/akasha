import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadInMyPlace = {
  id: "01a0b9ee-e7b0-7e49-8af2-5d0fe2329870",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-in-my-place",
  ownLength: 3.778,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nvC4i2aMo4CzRjRflysah",
      externalLink: "https://open.spotify.com/track/2nvC4i2aMo4CzRjRflysah",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Place",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "inmyplace|4gzpq5DPGxSnKTe4SA8HAU|226680",
  song: "song/coldplay-in-my-place",
} as const satisfies Track
