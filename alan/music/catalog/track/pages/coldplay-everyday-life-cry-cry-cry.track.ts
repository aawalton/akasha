import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeCryCryCry = {
  id: "01a0b9ee-d08d-75c6-8452-aa9ce3883faf",
  type: "page-type/track",
  slug: "coldplay-everyday-life-cry-cry-cry",
  ownLength: 2.788,
  ownProgress: 2.788,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cry Cry Cry",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
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
