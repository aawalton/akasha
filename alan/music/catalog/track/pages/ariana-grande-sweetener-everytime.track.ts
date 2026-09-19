import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerEverytime = {
  id: "01a0a6c5-29f4-7867-9407-1b057fc368f2",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-everytime",
  ownLength: 2.8684333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WdR2AyLW1Drd3OUdwezM0",
      externalLink: "https://open.spotify.com/track/0WdR2AyLW1Drd3OUdwezM0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "everytime",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "everytime|66CXWjxzNUsdJxJ2JdwvnR|172106",
  song: "song/ariana-grande-everytime",
} as const satisfies Track
