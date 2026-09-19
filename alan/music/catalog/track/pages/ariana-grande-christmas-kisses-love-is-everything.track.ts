import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesLoveIsEverything = {
  id: "01a0a6c5-3e28-7693-bfcb-c7f44b2021f0",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-love-is-everything",
  ownLength: 3.5464333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25tkPPlBrYCXkSIAASibtL",
      externalLink: "https://open.spotify.com/track/25tkPPlBrYCXkSIAASibtL",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Love Is Everything",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "loveiseverything|66CXWjxzNUsdJxJ2JdwvnR|212786",
  song: "song/ariana-grande-love-is-everything",
} as const satisfies Track
