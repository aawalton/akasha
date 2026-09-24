import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeSunrise = {
  id: "01a0b9ee-ced8-789e-b578-a2d853e1d6f8",
  type: "page-type/track",
  slug: "coldplay-everyday-life-sunrise",
  ownLength: 2.5182166666666665,
  ownProgress: 2.5182166666666665,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sunrise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "sunrise|4gzpq5DPGxSnKTe4SA8HAU|151093",
  song: "song/coldplay-sunrise",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 1,
      externalId: "6Tb7Zfo4PcSiS4TqQ4NnTh",
      externalLink: "https://open.spotify.com/track/6Tb7Zfo4PcSiS4TqQ4NnTh",
    },
  ],
} as const satisfies Track
