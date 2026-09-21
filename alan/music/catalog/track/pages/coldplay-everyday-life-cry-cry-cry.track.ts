import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeCryCryCry = {
  id: "01a0b9ee-d08d-75c6-8452-aa9ce3883faf",
  type: "page-type/track",
  slug: "coldplay-everyday-life-cry-cry-cry",
  ownLength: 2.788,
  ownProgress: 2.788,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Kwhm5VU4huxmQtBqd1AXo",
      externalLink: "https://open.spotify.com/track/4Kwhm5VU4huxmQtBqd1AXo",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cry Cry Cry",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "crycrycry|4gzpq5DPGxSnKTe4SA8HAU|167280",
  song: "song/coldplay-cry-cry-cry",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 4,
      externalId: "4Kwhm5VU4huxmQtBqd1AXo",
      externalLink: "https://open.spotify.com/track/4Kwhm5VU4huxmQtBqd1AXo",
    },
  ],
} as const satisfies Track
