import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsNasty = {
  id: "01a0a6c5-2222-77d0-88bf-ac5b9f3cc2bf",
  type: "page-type/track",
  slug: "ariana-grande-positions-nasty",
  ownLength: 3.3455333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0sci7ppTZFm4mjcH3nu8yO",
      externalLink: "https://open.spotify.com/track/0sci7ppTZFm4mjcH3nu8yO",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "nasty",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "nasty|66CXWjxzNUsdJxJ2JdwvnR|200732",
  song: "song/ariana-grande-nasty",
} as const satisfies Track
