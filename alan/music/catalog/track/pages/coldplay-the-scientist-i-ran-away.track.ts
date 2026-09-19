import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheScientistIRanAway = {
  id: "01a0b9ef-026c-7240-98ca-f0e8e158414d",
  type: "page-type/track",
  slug: "coldplay-the-scientist-i-ran-away",
  ownLength: 4.447766666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-scientist"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DQoNwxygxmQVH972Ha75w",
      externalLink: "https://open.spotify.com/track/1DQoNwxygxmQVH972Ha75w",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Ran Away",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "iranaway|4gzpq5DPGxSnKTe4SA8HAU|266866",
  song: "song/coldplay-i-ran-away",
} as const satisfies Track
