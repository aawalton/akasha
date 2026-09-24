import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeEverydayLife = {
  id: "01a0b9ee-d12b-7012-a519-813e6aaa2f52",
  type: "page-type/track",
  slug: "coldplay-everyday-life-everyday-life",
  ownLength: 4.308883333333333,
  ownProgress: 4.308883333333333,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everyday Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "everydaylife|4gzpq5DPGxSnKTe4SA8HAU|258533",
  song: "song/coldplay-everyday-life",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 8,
      externalId: "0h9fnCSnbUgOEgibnQByFv",
      externalLink: "https://open.spotify.com/track/0h9fnCSnbUgOEgibnQByFv",
    },
  ],
} as const satisfies Track
