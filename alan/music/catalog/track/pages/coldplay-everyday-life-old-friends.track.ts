import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeOldFriends = {
  id: "01a0b9ee-d0b0-7c5d-9bd6-f9fca0bf022e",
  type: "page-type/track",
  slug: "coldplay-everyday-life-old-friends",
  ownLength: 2.4491,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3E3zYgQul8EaJioNvD2tv9",
      externalLink: "https://open.spotify.com/track/3E3zYgQul8EaJioNvD2tv9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Old Friends",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "oldfriends|4gzpq5DPGxSnKTe4SA8HAU|146946",
} as const satisfies Track
