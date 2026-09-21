import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsObvious = {
  id: "01a0a6c5-22b1-721f-ad1a-7a661f82362b",
  type: "page-type/track",
  slug: "ariana-grande-positions-obvious",
  ownLength: 2.4493,
  ownProgress: 2.4493,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 13,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0q85C1JiECyYIQthz1posA",
      externalLink: "https://open.spotify.com/track/0q85C1JiECyYIQthz1posA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "obvious",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "obvious|66CXWjxzNUsdJxJ2JdwvnR|146958",
  song: "song/ariana-grande-obvious",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 13,
      externalId: "0q85C1JiECyYIQthz1posA",
      externalLink: "https://open.spotify.com/track/0q85C1JiECyYIQthz1posA",
    },
  ],
} as const satisfies Track
