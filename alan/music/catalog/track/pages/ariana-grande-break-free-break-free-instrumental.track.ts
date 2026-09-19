import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBreakFreeBreakFreeInstrumental = {
  id: "01a0a6c5-3d82-7eba-b64b-bf7a527eeec8",
  type: "page-type/track",
  slug: "ariana-grande-break-free-break-free-instrumental",
  ownLength: 3.572,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-break-free"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XUkjZrKbmpzSMo5pX1n5m",
      externalLink: "https://open.spotify.com/track/4XUkjZrKbmpzSMo5pX1n5m",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Break Free - Instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2qxJFvFYMEDqd7ui6kSAcq", artistName: "Zedd" },
  ],
  trackKey: "breakfreeinstrumental|2qxJFvFYMEDqd7ui6kSAcq,66CXWjxzNUsdJxJ2JdwvnR|214320",
  song: "song/ariana-grande-break-free",
} as const satisfies Track
