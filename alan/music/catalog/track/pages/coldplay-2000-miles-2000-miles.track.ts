import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplay2000Miles2000Miles = {
  id: "01a0b9ef-004a-7937-8d10-49d325b633e1",
  type: "page-type/track",
  slug: "coldplay-2000-miles-2000-miles",
  ownLength: 3.26195,
  ownProgress: 3.26195,
  partOfCollections: ["release/coldplay-2000-miles"],
  status: "completed",
  unit: "unit/minutes",
  title: "2000 Miles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "2000miles|4gzpq5DPGxSnKTe4SA8HAU|195717",
  song: "song/coldplay-2000-miles",
  carriedBy: [
    {
      release: "release/coldplay-2000-miles",
      discNumber: 1,
      position: 1,
      externalId: "5v1SC5d3F8VHwqkXx53f7d",
      externalLink: "https://open.spotify.com/track/5v1SC5d3F8VHwqkXx53f7d",
    },
  ],
} as const satisfies Track
