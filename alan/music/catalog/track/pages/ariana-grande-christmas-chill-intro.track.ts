import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillIntro = {
  id: "01a0a6c5-39e5-7ffa-a2b6-c50adfbb2317",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-intro",
  ownLength: 1.09475,
  ownProgress: 1.09475,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Intro",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "intro|66CXWjxzNUsdJxJ2JdwvnR|65685",
  song: "song/ariana-grande-intro",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 1,
      externalId: "2RD9V9Yzn6CF1HizEqAXlR",
      externalLink: "https://open.spotify.com/track/2RD9V9Yzn6CF1HizEqAXlR",
    },
  ],
} as const satisfies Track
