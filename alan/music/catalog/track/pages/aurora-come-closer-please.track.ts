import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserPlease = {
  id: "01a0b637-e6ea-7806-b5cf-b289d7af8751",
  type: "page-type/track",
  slug: "aurora-come-closer-please",
  grade: "C",
  ownLength: 0.5166666666666667,
  ownProgress: 0.5166666666666667,
  partOfCollections: ["release/aurora-come-closer"],
  status: "completed",
  unit: "unit/minutes",
  title: "PLEASE",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "TOMORA" },
    { artist: "artist/aurora" },
    { artistName: "Tom Rowlands" },
  ],
  trackKey: "please|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|31000",
  song: "song/aurora-please",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 1,
      externalId: "4kdiZfBFDWQXbDfMK51HDf",
      externalLink: "https://open.spotify.com/track/4kdiZfBFDWQXbDfMK51HDf",
    },
  ],
} as const satisfies Track
