import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesLastChristmas = {
  id: "01a0a6c5-3e04-7940-b3d9-d6470d41c338",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-last-christmas",
  ownLength: 3.394216666666667,
  ownProgress: 3.394216666666667,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  status: "completed",
  unit: "unit/minutes",
  title: "Last Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "lastchristmas|66CXWjxzNUsdJxJ2JdwvnR|203653",
  song: "song/taylor-swift-last-christmas",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-kisses",
      discNumber: 1,
      position: 1,
      externalId: "5xDrO9DEDJGUQGfyoHvgDJ",
      externalLink: "https://open.spotify.com/track/5xDrO9DEDJGUQGfyoHvgDJ",
    },
  ],
} as const satisfies Track
