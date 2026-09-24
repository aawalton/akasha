import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBreakYourHeartRightBack = {
  id: "01a0a6c5-2e51-7be2-8b8a-6e7675eb63de",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-break-your-heart-right-back",
  ownLength: 4.2231,
  ownProgress: 4.2231,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Break Your Heart Right Back",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Childish Gambino" }],
  trackKey: "breakyourheartrightback|66CXWjxzNUsdJxJ2JdwvnR,73sIBHcqh3Z3NyqHKZ7FOL|253386",
  song: "song/ariana-grande-break-your-heart-right-back",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "0HGcQDbRen8luCnwH53sNl",
      externalLink: "https://open.spotify.com/track/0HGcQDbRen8luCnwH53sNl",
    },
  ],
} as const satisfies Track
