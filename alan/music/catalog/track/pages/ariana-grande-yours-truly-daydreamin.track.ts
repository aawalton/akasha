import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyDaydreamin = {
  id: "01a0a6c5-302e-7937-ba29-dd1f06e13c86",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-daydreamin",
  ownLength: 3.52155,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7c86ULTZD9eNdAbJDQLRaC",
      externalLink: "https://open.spotify.com/track/7c86ULTZD9eNdAbJDQLRaC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Daydreamin'",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "daydreamin|66CXWjxzNUsdJxJ2JdwvnR|211293",
  song: "song/ariana-grande-daydreamin",
} as const satisfies Track
