import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerSweetener = {
  id: "01a0a6c5-29b6-7fb7-a530-7e4e3cc0cbeb",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-sweetener",
  ownLength: 3.4748833333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70khXICDeTTxgYtw3EysKH",
      externalLink: "https://open.spotify.com/track/70khXICDeTTxgYtw3EysKH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "sweetener",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "sweetener|66CXWjxzNUsdJxJ2JdwvnR|208493",
  song: "song/ariana-grande-sweetener",
} as const satisfies Track
