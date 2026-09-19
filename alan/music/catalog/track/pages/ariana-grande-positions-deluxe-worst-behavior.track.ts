import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeWorstBehavior = {
  id: "01a0a6c5-20e9-7dd7-82d8-02ca718690f7",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-worst-behavior",
  ownLength: 2.07135,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KIKaWKE9wV6mLjho3w61y",
      externalLink: "https://open.spotify.com/track/6KIKaWKE9wV6mLjho3w61y",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "worst behavior",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "worstbehavior|66CXWjxzNUsdJxJ2JdwvnR|124281",
  song: "song/ariana-grande-worst-behavior",
} as const satisfies Track
