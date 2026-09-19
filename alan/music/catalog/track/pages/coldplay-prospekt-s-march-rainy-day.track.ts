import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchRainyDay = {
  id: "01a0b9ee-fc5f-7041-8304-0d7ef9ed414c",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-rainy-day",
  ownLength: 3.4333666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-prospekt-s-march"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49m9whshOPxI2qBzWBNKwk",
      externalLink: "https://open.spotify.com/track/49m9whshOPxI2qBzWBNKwk",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rainy Day",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "rainyday|4gzpq5DPGxSnKTe4SA8HAU|206002",
  song: "song/coldplay-rainy-day",
} as const satisfies Track
