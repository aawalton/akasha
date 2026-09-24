import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyHoneymoonAvenue = {
  id: "01a0a6c5-2f66-7193-a6c5-f5beccc0aca6",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-honeymoon-avenue",
  ownLength: 5.662216666666667,
  ownProgress: 5.662216666666667,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Honeymoon Avenue",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "honeymoonavenue|66CXWjxzNUsdJxJ2JdwvnR|339733",
  song: "song/ariana-grande-honeymoon-avenue",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 1,
      externalId: "2ofOe2OaXFpZF5ETbsc7Qu",
      externalLink: "https://open.spotify.com/track/2ofOe2OaXFpZF5ETbsc7Qu",
    },
  ],
} as const satisfies Track
