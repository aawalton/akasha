import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerREM = {
  id: "01a0a6c5-2976-72e2-9640-585eaba39850",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-r-e-m",
  ownLength: 4.094433333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1xWH8zYtDeS9mW1JJG23VZ",
      externalLink: "https://open.spotify.com/track/1xWH8zYtDeS9mW1JJG23VZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "R.E.M",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "rem|66CXWjxzNUsdJxJ2JdwvnR|245666",
  song: "song/ariana-grande-r-e-m",
} as const satisfies Track
