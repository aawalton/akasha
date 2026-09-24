import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeOneLastTime = {
  id: "01a0a6c5-2d99-7128-b75a-a98c6e9d2dd6",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-one-last-time",
  ownLength: 3.2877666666666667,
  ownProgress: 3.2877666666666667,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Last Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "onelasttime|66CXWjxzNUsdJxJ2JdwvnR|197266",
  song: "song/ariana-grande-one-last-time",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "7xoUc6faLbCqZO6fQEYprd",
      externalLink: "https://open.spotify.com/track/7xoUc6faLbCqZO6fQEYprd",
    },
  ],
} as const satisfies Track
