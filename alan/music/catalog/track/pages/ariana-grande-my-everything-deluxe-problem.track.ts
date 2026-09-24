import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeProblem = {
  id: "01a0a6c5-2d78-73c1-8f01-fc392485450f",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-problem",
  ownLength: 3.232,
  ownProgress: 3.232,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Problem",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Iggy Azalea" }],
  trackKey: "problem|5yG7ZAZafVaAlMTeBybKAL,66CXWjxzNUsdJxJ2JdwvnR|193920",
  song: "song/ariana-grande-problem",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "7vS3Y0IKjde7Xg85LWIEdP",
      externalLink: "https://open.spotify.com/track/7vS3Y0IKjde7Xg85LWIEdP",
    },
  ],
} as const satisfies Track
