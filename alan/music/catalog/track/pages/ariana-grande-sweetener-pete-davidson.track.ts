import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerPeteDavidson = {
  id: "01a0a6c5-2abc-713e-8f96-c3e10d36d3de",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-pete-davidson",
  ownLength: 1.2302166666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0XOnMqLQDO89iAg7dWWwnG",
      externalLink: "https://open.spotify.com/track/0XOnMqLQDO89iAg7dWWwnG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "pete davidson",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "petedavidson|66CXWjxzNUsdJxJ2JdwvnR|73813",
} as const satisfies Track
