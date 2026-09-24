import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeWhyTry = {
  id: "01a0a6c5-2dbe-7c92-9144-0b59aeac5f29",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-why-try",
  ownLength: 3.5313333333333334,
  ownProgress: 3.5313333333333334,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Why Try",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "whytry|66CXWjxzNUsdJxJ2JdwvnR|211880",
  song: "song/ariana-grande-why-try",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "40fHWRL8bKcl5J4t4OKUiW",
      externalLink: "https://open.spotify.com/track/40fHWRL8bKcl5J4t4OKUiW",
    },
  ],
} as const satisfies Track
