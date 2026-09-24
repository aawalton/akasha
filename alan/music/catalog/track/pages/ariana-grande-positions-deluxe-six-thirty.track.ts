import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeSixThirty = {
  id: "01a0a6c5-1f6e-75f3-88fb-318ac75918c1",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-six-thirty",
  ownLength: 3.064566666666667,
  ownProgress: 3.064566666666667,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "six thirty",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "sixthirty|66CXWjxzNUsdJxJ2JdwvnR|183874",
  song: "song/ariana-grande-six-thirty",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 6,
      externalId: "2IKJtXeR5UsaUjZB46fTOK",
      externalLink: "https://open.spotify.com/track/2IKJtXeR5UsaUjZB46fTOK",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "4rJWTThj9EWR6UqD1eVyge",
      externalLink: "https://open.spotify.com/track/4rJWTThj9EWR6UqD1eVyge",
    },
  ],
} as const satisfies Track
