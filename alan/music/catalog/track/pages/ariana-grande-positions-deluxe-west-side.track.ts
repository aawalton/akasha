import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeWestSide = {
  id: "01a0a6c5-1fe7-733e-bbd5-22c8fede63e2",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-west-side",
  ownLength: 2.2046333333333332,
  ownProgress: 2.2046333333333332,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "west side",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "westside|66CXWjxzNUsdJxJ2JdwvnR|132278",
  song: "song/ariana-grande-west-side",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 10,
      externalId: "1whfVLMKWqAX3uk97VXsNN",
      externalLink: "https://open.spotify.com/track/1whfVLMKWqAX3uk97VXsNN",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "7cFYqReKEigTxTm0bNE6YA",
      externalLink: "https://open.spotify.com/track/7cFYqReKEigTxTm0bNE6YA",
    },
  ],
} as const satisfies Track
