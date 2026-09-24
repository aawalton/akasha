import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangBangBangInstrumental = {
  id: "01a0a6c5-3d25-7787-a1cf-a9e0af601891",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-bang-bang-instrumental",
  ownLength: 3.30605,
  ownProgress: 3.30605,
  partOfCollections: ["release/ariana-grande-bang-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bang Bang - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [
    { artistName: "Jessie J" },
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
  ],
  trackKey:
    "bangbanginstrumental|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|198363",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-bang-bang",
      discNumber: 1,
      position: 3,
      externalId: "2S6WKsqvbcX8doRfCioFar",
      externalLink: "https://open.spotify.com/track/2S6WKsqvbcX8doRfCioFar",
    },
  ],
} as const satisfies Track
