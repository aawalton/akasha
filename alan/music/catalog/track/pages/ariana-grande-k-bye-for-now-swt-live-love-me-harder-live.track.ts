import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeKByeForNowSwtLiveLoveMeHarderLive = {
  id: "01a0a6c5-244b-7bf2-b8c6-e75103bc647d",
  type: "page-type/track",
  slug: "ariana-grande-k-bye-for-now-swt-live-love-me-harder-live",
  ownLength: 1.3964,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-k-bye-for-now-swt-live"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Q4JJnjX00q8O10OliHhjS",
      externalLink: "https://open.spotify.com/track/6Q4JJnjX00q8O10OliHhjS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "love me harder - live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "lovemeharderlive|66CXWjxzNUsdJxJ2JdwvnR|83784",
  song: "song/ariana-grande-love-me-harder",
} as const satisfies Track
