import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayShiverForYou = {
  id: "01a0b9ef-043a-7454-921c-a63d66277381",
  type: "page-type/track",
  slug: "coldplay-shiver-for-you",
  ownLength: 5.731766666666666,
  ownProgress: 5.731766666666666,
  partOfCollections: ["release/coldplay-shiver"],
  status: "completed",
  unit: "unit/minutes",
  title: "For You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "foryou|4gzpq5DPGxSnKTe4SA8HAU|343906",
  song: "song/coldplay-for-you",
  carriedBy: [
    {
      release: "release/coldplay-shiver",
      discNumber: 1,
      position: 2,
      externalId: "6hQ1OH4kWqkjxpZQt0rNwr",
      externalLink: "https://open.spotify.com/track/6hQ1OH4kWqkjxpZQt0rNwr",
    },
  ],
} as const satisfies Track
