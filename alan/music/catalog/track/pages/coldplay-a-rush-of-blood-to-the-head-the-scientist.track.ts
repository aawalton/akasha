import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadTheScientist = {
  id: "01a0b9ee-e7f9-7128-92f8-945a018afab4",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-the-scientist",
  ownLength: 5.16,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "75JFxkI2RXiU7L9VXzMkle",
      externalLink: "https://open.spotify.com/track/75JFxkI2RXiU7L9VXzMkle",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Scientist",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thescientist|4gzpq5DPGxSnKTe4SA8HAU|309600",
  song: "song/coldplay-the-scientist",
} as const satisfies Track
