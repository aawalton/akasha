import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesTrueLove = {
  id: "01a0b9ee-d88b-7300-881b-67d34fe59ed2",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-true-love",
  ownLength: 4.1,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fQuzbQNLcD1ofo7B2NcFI",
      externalLink: "https://open.spotify.com/track/0fQuzbQNLcD1ofo7B2NcFI",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "True Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "truelove|4gzpq5DPGxSnKTe4SA8HAU|246000",
  song: "song/coldplay-true-love",
} as const satisfies Track
