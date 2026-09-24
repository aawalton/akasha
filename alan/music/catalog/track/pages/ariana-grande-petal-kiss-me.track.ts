import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalKissMe = {
  id: "01a0a6c5-03df-76a2-9682-f4cdfd7b6913",
  type: "page-type/track",
  slug: "ariana-grande-petal-kiss-me",
  grade: "A+",
  ownLength: 3.6597333333333335,
  ownProgress: 3.6597333333333335,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "kiss me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "kissme|66CXWjxzNUsdJxJ2JdwvnR|219584",
  song: "song/ariana-grande-kiss-me",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 1,
      externalId: "0lok0VDJn0zRvHLBCITSSw",
      externalLink: "https://open.spotify.com/track/0lok0VDJn0zRvHLBCITSSw",
    },
  ],
} as const satisfies Track
