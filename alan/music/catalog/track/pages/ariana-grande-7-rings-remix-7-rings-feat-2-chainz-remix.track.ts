import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrande7RingsRemix7RingsFeat2ChainzRemix = {
  id: "01a0a6c5-3894-7d38-b166-f59b003f1d37",
  type: "page-type/track",
  slug: "ariana-grande-7-rings-remix-7-rings-feat-2-chainz-remix",
  ownLength: 2.977333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-7-rings-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6AyI8UGx8Y4peb7pLOy2pf",
      externalLink: "https://open.spotify.com/track/6AyI8UGx8Y4peb7pLOy2pf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "7 rings (feat. 2 Chainz) - Remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "17lzZA2AlOHwCwFALHttmp", artistName: "2 Chainz" },
  ],
  trackKey: "7ringsfeat2chainzremix|17lzZA2AlOHwCwFALHttmp,66CXWjxzNUsdJxJ2JdwvnR|178640",
  song: "song/ariana-grande-7-rings",
} as const satisfies Track
