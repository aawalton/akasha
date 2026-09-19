import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesInk = {
  id: "01a0b9ee-d85f-7c1c-956e-2fc51d312c60",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-ink",
  ownLength: 3.806216666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6c6W25YoDGjTq3qSPOga5t",
      externalLink: "https://open.spotify.com/track/6c6W25YoDGjTq3qSPOga5t",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ink",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "ink|4gzpq5DPGxSnKTe4SA8HAU|228373",
  song: "song/coldplay-ink",
} as const satisfies Track
