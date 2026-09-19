import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSupernaturalSupernaturalInstrumental = {
  id: "01a0a6c5-319a-71ea-b086-5c5d3610d6e0",
  type: "page-type/track",
  slug: "ariana-grande-supernatural-supernatural-instrumental",
  ownLength: 2.7230166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-supernatural"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jCGZHjQgg1DGIomcvToD0",
      externalLink: "https://open.spotify.com/track/0jCGZHjQgg1DGIomcvToD0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural - instrumental",
  trackType: "instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernaturalinstrumental|66CXWjxzNUsdJxJ2JdwvnR|163381",
  song: "song/ariana-grande-supernatural",
} as const satisfies Track
