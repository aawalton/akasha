import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBreakFreeBreakFreeACappella = {
  id: "01a0a6c5-3d63-72e5-8599-4ac7327267d6",
  type: "page-type/track",
  slug: "ariana-grande-break-free-break-free-a-cappella",
  ownLength: 3.3838,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-break-free"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1VGnGcB9mBywGac3H9yoQj",
      externalLink: "https://open.spotify.com/track/1VGnGcB9mBywGac3H9yoQj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Break Free - A Cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "breakfreeacappella|66CXWjxzNUsdJxJ2JdwvnR|203028",
} as const satisfies Track
