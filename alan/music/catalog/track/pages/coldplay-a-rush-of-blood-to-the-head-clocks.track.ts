import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadClocks = {
  id: "01a0b9ee-e81d-7c0b-972f-429e9c9500a6",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-clocks",
  ownLength: 5.131316666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0BCPKOYdS2jbQ8iyB56Zns",
      externalLink: "https://open.spotify.com/track/0BCPKOYdS2jbQ8iyB56Zns",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clocks",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "clocks|4gzpq5DPGxSnKTe4SA8HAU|307879",
} as const satisfies Track
