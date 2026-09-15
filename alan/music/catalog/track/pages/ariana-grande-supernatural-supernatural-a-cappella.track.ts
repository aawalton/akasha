import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSupernaturalSupernaturalACappella = {
  id: "01a0a6c5-317a-79f4-86aa-e3a4c35bb3e8",
  type: "page-type/track",
  slug: "ariana-grande-supernatural-supernatural-a-cappella",
  ownLength: 2.7230166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-supernatural"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DT3ExEsk6HYEJxlYNR7d1",
      externalLink: "https://open.spotify.com/track/1DT3ExEsk6HYEJxlYNR7d1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural - a cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernaturalacappella|66CXWjxzNUsdJxJ2JdwvnR|163381",
} as const satisfies Track
