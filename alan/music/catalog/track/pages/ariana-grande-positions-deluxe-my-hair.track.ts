import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeMyHair = {
  id: "01a0a6c5-1fa7-7641-88bd-0dfbf3b2f45f",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-my-hair",
  ownLength: 2.6406,
  ownProgress: 2.6406,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "my hair",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "myhair|66CXWjxzNUsdJxJ2JdwvnR|158436",
  song: "song/ariana-grande-my-hair",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 8,
      externalId: "6u7gmPOz7pzzaeR9xSBpsR",
      externalLink: "https://open.spotify.com/track/6u7gmPOz7pzzaeR9xSBpsR",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "5Ds3yH73nMHgkmJxcxqPrr",
      externalLink: "https://open.spotify.com/track/5Ds3yH73nMHgkmJxcxqPrr",
    },
  ],
} as const satisfies Track
