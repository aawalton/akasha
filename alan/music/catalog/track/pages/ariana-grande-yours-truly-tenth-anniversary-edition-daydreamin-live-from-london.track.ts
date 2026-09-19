import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionDaydreaminLiveFromLondon = {
  id: "01a0a6c5-1e41-776c-8ed1-a823f9979a02",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-daydreamin-live-from-london",
  ownLength: 3.505,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63ahDGtV2EGSs6etOGrnkc",
      externalLink: "https://open.spotify.com/track/63ahDGtV2EGSs6etOGrnkc",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Daydreamin' - Live from London",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "daydreaminlivefromlondon|66CXWjxzNUsdJxJ2JdwvnR|210300",
  song: "song/ariana-grande-daydreamin",
} as const satisfies Track
