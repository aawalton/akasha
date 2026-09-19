import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionDaydreamin = {
  id: "01a0a6c5-1d27-7102-9fca-74ea9428c841",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-daydreamin",
  ownLength: 3.52145,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tQew7pG4IhgNGplOSNIj7",
      externalLink: "https://open.spotify.com/track/2tQew7pG4IhgNGplOSNIj7",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Daydreamin'",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "daydreamin|66CXWjxzNUsdJxJ2JdwvnR|211287",
  song: "song/ariana-grande-daydreamin",
} as const satisfies Track
