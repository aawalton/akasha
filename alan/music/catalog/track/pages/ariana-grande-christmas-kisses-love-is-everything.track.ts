import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesLoveIsEverything = {
  id: "01a0a6c5-3e28-7693-bfcb-c7f44b2021f0",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-love-is-everything",
  ownLength: 3.5464333333333333,
  ownProgress: 3.5464333333333333,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Is Everything",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "loveiseverything|66CXWjxzNUsdJxJ2JdwvnR|212786",
  song: "song/ariana-grande-love-is-everything",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-kisses",
      discNumber: 1,
      position: 2,
      externalId: "25tkPPlBrYCXkSIAASibtL",
      externalLink: "https://open.spotify.com/track/25tkPPlBrYCXkSIAASibtL",
    },
  ],
} as const satisfies Track
