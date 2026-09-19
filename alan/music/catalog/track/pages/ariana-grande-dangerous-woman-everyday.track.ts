import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanEveryday = {
  id: "01a0a6c5-2c3e-7d54-9e1a-05d3cdb06b79",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-everyday",
  ownLength: 3.247333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "53SfB4huCgiRGmwzJdEo1u",
      externalLink: "https://open.spotify.com/track/53SfB4huCgiRGmwzJdEo1u",
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
  trackKey: "everyday|1RyvyyTE3xzB2ZywiAwp0i,66CXWjxzNUsdJxJ2JdwvnR|194840",
  song: "song/ariana-grande-everyday",
} as const satisfies Track
