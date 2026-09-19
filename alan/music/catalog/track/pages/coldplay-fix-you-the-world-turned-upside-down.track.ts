import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYouTheWorldTurnedUpsideDown = {
  id: "01a0b9ee-ff12-75a4-9c0a-44843436bc87",
  type: "page-type/track",
  slug: "coldplay-fix-you-the-world-turned-upside-down",
  ownLength: 4.5437666666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-fix-you"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1AvVRqeSLzsZJozkyaB9cu",
      externalLink: "https://open.spotify.com/track/1AvVRqeSLzsZJozkyaB9cu",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The World Turned Upside Down",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "theworldturnedupsidedown|4gzpq5DPGxSnKTe4SA8HAU|272626",
} as const satisfies Track
