import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyDaydreamin = {
  id: "01a0a6c5-302e-7937-ba29-dd1f06e13c86",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-daydreamin",
  ownLength: 3.52155,
  ownProgress: 3.52155,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  status: "completed",
  unit: "unit/minutes",
  title: "Daydreamin'",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "daydreamin|66CXWjxzNUsdJxJ2JdwvnR|211293",
  song: "song/ariana-grande-daydreamin",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly",
      discNumber: 1,
      position: 7,
      externalId: "7c86ULTZD9eNdAbJDQLRaC",
      externalLink: "https://open.spotify.com/track/7c86ULTZD9eNdAbJDQLRaC",
    },
  ],
} as const satisfies Track
