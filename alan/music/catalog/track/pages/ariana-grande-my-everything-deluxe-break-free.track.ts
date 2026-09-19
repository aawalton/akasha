import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBreakFree = {
  id: "01a0a6c5-2de2-75fd-87cd-13cdcc0776d8",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-break-free",
  ownLength: 3.5806666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "12KUFSHFgT0XCoiSlvdQi4",
      externalLink: "https://open.spotify.com/track/12KUFSHFgT0XCoiSlvdQi4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Break Free",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2qxJFvFYMEDqd7ui6kSAcq", artistName: "Zedd" },
  ],
  trackKey: "breakfree|2qxJFvFYMEDqd7ui6kSAcq,66CXWjxzNUsdJxJ2JdwvnR|214840",
  song: "song/ariana-grande-break-free",
} as const satisfies Track
