import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadAWhisper = {
  id: "01a0b9ee-e8ae-7074-a1ba-18ddd147687f",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-a-whisper",
  ownLength: 3.9722166666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KolrFGhfDi1JTSgQBT5sI",
      externalLink: "https://open.spotify.com/track/7KolrFGhfDi1JTSgQBT5sI",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Whisper",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "awhisper|4gzpq5DPGxSnKTe4SA8HAU|238333",
  song: "song/coldplay-a-whisper",
} as const satisfies Track
