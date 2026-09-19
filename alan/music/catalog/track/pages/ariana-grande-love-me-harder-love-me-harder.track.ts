import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeLoveMeHarderLoveMeHarder = {
  id: "01a0a6c5-3c20-7ecd-a303-f145b486f8ec",
  type: "page-type/track",
  slug: "ariana-grande-love-me-harder-love-me-harder",
  ownLength: 3.9340166666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-love-me-harder"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HE1FnMtSsRotzIAQPXpr5",
      externalLink: "https://open.spotify.com/track/7HE1FnMtSsRotzIAQPXpr5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Love Me Harder",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1Xyo4u8uXC1ZmMpatF05PJ", artistName: "The Weeknd" },
  ],
  trackKey: "lovemeharder|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|236041",
  song: "song/ariana-grande-love-me-harder",
} as const satisfies Track
