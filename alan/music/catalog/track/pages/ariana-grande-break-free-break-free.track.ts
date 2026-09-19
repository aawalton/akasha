import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBreakFreeBreakFree = {
  id: "01a0a6c5-3d44-726e-b1a8-6e8b195cc6e7",
  type: "page-type/track",
  slug: "ariana-grande-break-free-break-free",
  ownLength: 3.5807166666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-break-free"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2lOgTEwxmRPBtjp60opyRN",
      externalLink: "https://open.spotify.com/track/2lOgTEwxmRPBtjp60opyRN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Break Free",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2qxJFvFYMEDqd7ui6kSAcq", artistName: "Zedd" },
  ],
  trackKey: "breakfree|2qxJFvFYMEDqd7ui6kSAcq,66CXWjxzNUsdJxJ2JdwvnR|214843",
  song: "song/ariana-grande-break-free",
} as const satisfies Track
