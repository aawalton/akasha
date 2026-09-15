import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangBangBangInstrumental = {
  id: "01a0a6c5-3d25-7787-a1cf-a9e0af601891",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-bang-bang-instrumental",
  ownLength: 3.30605,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-bang-bang"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2S6WKsqvbcX8doRfCioFar",
      externalLink: "https://open.spotify.com/track/2S6WKsqvbcX8doRfCioFar",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang - Instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey:
    "bangbanginstrumental|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|198363",
} as const satisfies Track
