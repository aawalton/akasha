import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionWhyTry = {
  id: "01a0a6c5-1681-707b-80d8-4b9325648c87",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-why-try",
  ownLength: 3.5311833333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6O5sKvYjB1R20oCTyaJsc5",
      externalLink: "https://open.spotify.com/track/6O5sKvYjB1R20oCTyaJsc5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Why Try",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "whytry|66CXWjxzNUsdJxJ2JdwvnR|211871",
  song: "song/ariana-grande-why-try",
} as const satisfies Track
