import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesSnowInCalifornia = {
  id: "01a0a6c5-3e4e-7f62-a2ae-6a71a9239952",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-snow-in-california",
  ownLength: 3.43955,
  ownProgress: 3.43955,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  status: "completed",
  unit: "unit/minutes",
  title: "Snow In California",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "snowincalifornia|66CXWjxzNUsdJxJ2JdwvnR|206373",
  song: "song/ariana-grande-snow-in-california",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-kisses",
      discNumber: 1,
      position: 3,
      externalId: "6Uc4EHr3ktYmLfLDY7LifJ",
      externalLink: "https://open.spotify.com/track/6Uc4EHr3ktYmLfLDY7LifJ",
    },
  ],
} as const satisfies Track
