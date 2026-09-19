import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadGreenEyes = {
  id: "01a0b9ee-e864-75e4-bfce-d59d66ae5055",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-green-eyes",
  ownLength: 3.7173333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ou9rSNUQnE7XYmJkUUIOc",
      externalLink: "https://open.spotify.com/track/3ou9rSNUQnE7XYmJkUUIOc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Green Eyes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "greeneyes|4gzpq5DPGxSnKTe4SA8HAU|223040",
  song: "song/coldplay-green-eyes",
} as const satisfies Track
