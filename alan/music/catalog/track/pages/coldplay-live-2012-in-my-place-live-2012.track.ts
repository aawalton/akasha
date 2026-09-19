import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012InMyPlaceLive2012 = {
  id: "01a0b9ee-d9d0-74f7-9eae-552d90a45f24",
  type: "page-type/track",
  slug: "coldplay-live-2012-in-my-place-live-2012",
  ownLength: 3.9217666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OOloRWmvXZG3aQaeWjDNN",
      externalLink: "https://open.spotify.com/track/5OOloRWmvXZG3aQaeWjDNN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In My Place - Live 2012",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "inmyplacelive2012|4gzpq5DPGxSnKTe4SA8HAU|235306",
} as const satisfies Track
