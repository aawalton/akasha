import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYSquareOne = {
  id: "01a0b9ee-e3e4-7629-9846-4f3bfd4ecd99",
  type: "page-type/track",
  slug: "coldplay-x-y-square-one",
  ownLength: 4.7939,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2zQIITgo6sc5ppOfPcH205",
      externalLink: "https://open.spotify.com/track/2zQIITgo6sc5ppOfPcH205",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Square One",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "squareone|4gzpq5DPGxSnKTe4SA8HAU|287634",
} as const satisfies Track
