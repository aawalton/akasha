import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverglowEverglow = {
  id: "01a0b9ee-f47d-75c7-9aae-a85816361394",
  type: "page-type/track",
  slug: "coldplay-everglow-everglow",
  ownLength: 5.03,
  ownProgress: 5.03,
  partOfCollections: ["release/coldplay-everglow"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everglow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "everglow|4gzpq5DPGxSnKTe4SA8HAU|301800",
  song: "song/coldplay-everglow",
  carriedBy: [
    {
      release: "release/coldplay-everglow",
      discNumber: 1,
      position: 2,
      externalId: "6r2BFEIErNwG0owW4rOQB8",
      externalLink: "https://open.spotify.com/track/6r2BFEIErNwG0owW4rOQB8",
    },
  ],
} as const satisfies Track
