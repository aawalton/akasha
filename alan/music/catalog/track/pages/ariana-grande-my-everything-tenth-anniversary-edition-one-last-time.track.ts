import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionOneLastTime = {
  id: "01a0a6c5-1660-7b36-a28b-f4c28e519c16",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-one-last-time",
  ownLength: 3.2879666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0e6qFb4yA7MkyHA9Cpb6c1",
      externalLink: "https://open.spotify.com/track/0e6qFb4yA7MkyHA9Cpb6c1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Last Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "onelasttime|66CXWjxzNUsdJxJ2JdwvnR|197278",
  song: "song/ariana-grande-one-last-time",
} as const satisfies Track
