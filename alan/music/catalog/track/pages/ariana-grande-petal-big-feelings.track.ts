import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalBigFeelings = {
  id: "01a0a6c5-0488-7700-acda-d0bfcc6b63ac",
  type: "page-type/track",
  slug: "ariana-grande-petal-big-feelings",
  ownLength: 2.8937,
  ownProgress: 2.8937,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "big feelings",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "bigfeelings|66CXWjxzNUsdJxJ2JdwvnR|173622",
  song: "song/ariana-grande-big-feelings",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 6,
      externalId: "6MFSqc8pzXlwfzXqWZEKd4",
      externalLink: "https://open.spotify.com/track/6MFSqc8pzXlwfzXqWZEKd4",
    },
  ],
} as const satisfies Track
