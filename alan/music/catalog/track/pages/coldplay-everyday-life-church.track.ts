import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeChurch = {
  id: "01a0b9ee-ceff-7bab-9a39-755c857c45a5",
  type: "page-type/track",
  slug: "coldplay-everyday-life-church",
  ownLength: 3.83355,
  ownProgress: 3.83355,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Church",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "church|4gzpq5DPGxSnKTe4SA8HAU|230013",
  song: "song/coldplay-church",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 2,
      externalId: "1e8D1BCD2afT56Km7UahpB",
      externalLink: "https://open.spotify.com/track/1e8D1BCD2afT56Km7UahpB",
    },
  ],
} as const satisfies Track
