import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeKByeForNowSwtLiveSweetenerLive = {
  id: "01a0a6c5-23cf-72fe-a061-8cd9eb67be76",
  type: "page-type/track",
  slug: "ariana-grande-k-bye-for-now-swt-live-sweetener-live",
  ownLength: 2.9,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-k-bye-for-now-swt-live"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Bvxlmt3CtZTyls2IJQ38T",
      externalLink: "https://open.spotify.com/track/1Bvxlmt3CtZTyls2IJQ38T",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "sweetener - live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "sweetenerlive|66CXWjxzNUsdJxJ2JdwvnR|174000",
  song: "song/ariana-grande-sweetener",
} as const satisfies Track
