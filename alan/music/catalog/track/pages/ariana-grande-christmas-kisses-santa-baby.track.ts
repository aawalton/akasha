import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesSantaBaby = {
  id: "01a0a6c5-3e73-7c7f-9103-92693f05a995",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-santa-baby",
  ownLength: 2.848883333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YJdPrH3i2POzu7hdHIRrb",
      externalLink: "https://open.spotify.com/track/6YJdPrH3i2POzu7hdHIRrb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Santa Baby",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "7pLntWGInZPQxc4kXxzzjB", artistName: "Liz Gillies" },
  ],
  trackKey: "santababy|66CXWjxzNUsdJxJ2JdwvnR,7pLntWGInZPQxc4kXxzzjB|170933",
} as const satisfies Track
