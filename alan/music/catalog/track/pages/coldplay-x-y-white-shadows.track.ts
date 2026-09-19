import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYWhiteShadows = {
  id: "01a0b9ee-e42e-7367-aff2-315209601948",
  type: "page-type/track",
  slug: "coldplay-x-y-white-shadows",
  ownLength: 5.470316666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WWz2AaqxLoO0fa9ou6Fqc",
      externalLink: "https://open.spotify.com/track/0WWz2AaqxLoO0fa9ou6Fqc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Shadows",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "whiteshadows|4gzpq5DPGxSnKTe4SA8HAU|328219",
  song: "song/coldplay-white-shadows",
} as const satisfies Track
