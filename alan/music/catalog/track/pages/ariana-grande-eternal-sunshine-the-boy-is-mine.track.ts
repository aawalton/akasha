import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineTheBoyIsMine = {
  id: "01a0a6c5-1bb7-7ab2-97ce-c8f88c0bc60b",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-the-boy-is-mine",
  ownLength: 2.8939833333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Lmbke3KNVFXtoH2mMSHCw",
      externalLink: "https://open.spotify.com/track/0Lmbke3KNVFXtoH2mMSHCw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the boy is mine",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "theboyismine|66CXWjxzNUsdJxJ2JdwvnR|173639",
} as const satisfies Track
