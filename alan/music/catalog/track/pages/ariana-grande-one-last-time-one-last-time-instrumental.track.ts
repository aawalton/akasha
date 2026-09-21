import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeOneLastTimeOneLastTimeInstrumental = {
  id: "01a0a6c5-3cc9-7eab-aa19-2c31ba794085",
  type: "page-type/track",
  slug: "ariana-grande-one-last-time-one-last-time-instrumental",
  ownLength: 3.314766666666667,
  ownProgress: 3.314766666666667,
  partOfCollections: ["release/ariana-grande-one-last-time"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4VlyINESDLEOklzN6JCQtE",
      externalLink: "https://open.spotify.com/track/4VlyINESDLEOklzN6JCQtE",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Last Time - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "onelasttimeinstrumental|66CXWjxzNUsdJxJ2JdwvnR|198886",
  song: "song/ariana-grande-one-last-time",
  carriedBy: [
    {
      release: "release/ariana-grande-one-last-time",
      discNumber: 1,
      position: 3,
      externalId: "4VlyINESDLEOklzN6JCQtE",
      externalLink: "https://open.spotify.com/track/4VlyINESDLEOklzN6JCQtE",
    },
  ],
} as const satisfies Track
