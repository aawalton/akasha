import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeObvious = {
  id: "01a0a6c5-2041-7abd-8ef5-94718b1bc68a",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-obvious",
  ownLength: 2.4493,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65OEcDb4M3mAvEpSdXi6Lv",
      externalLink: "https://open.spotify.com/track/65OEcDb4M3mAvEpSdXi6Lv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "obvious",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "obvious|66CXWjxzNUsdJxJ2JdwvnR|146958",
} as const satisfies Track
