import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionEveryday = {
  id: "01a0a6c5-0679-7706-a834-59d2b2807d63",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-everyday",
  ownLength: 3.2472166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28OUThncuwdC6uasRvZd9w",
      externalLink: "https://open.spotify.com/track/28OUThncuwdC6uasRvZd9w",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Everyday",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1RyvyyTE3xzB2ZywiAwp0i", artistName: "Future" },
  ],
  trackKey: "everyday|1RyvyyTE3xzB2ZywiAwp0i,66CXWjxzNUsdJxJ2JdwvnR|194833",
  song: "song/ariana-grande-everyday",
} as const satisfies Track
