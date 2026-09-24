import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangRemixesBangBangDadaLifeRemix = {
  id: "01a0a6c5-3b6d-7a23-931b-678f22d0f4f1",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-remixes-bang-bang-dada-life-remix",
  ownLength: 3.5731,
  ownProgress: 3.5731,
  partOfCollections: ["release/ariana-grande-bang-bang-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bang Bang - Dada Life Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "Jessie J" },
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
    { artistName: "Dada Life" },
  ],
  trackKey:
    "bangbangdadaliferemix|00sAT5YX8W3xNd1EuqyHw9,0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|214386",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-bang-bang-remixes",
      discNumber: 1,
      position: 1,
      externalId: "29kGXAiD6JiuzXpme5cXLU",
      externalLink: "https://open.spotify.com/track/29kGXAiD6JiuzXpme5cXLU",
    },
  ],
} as const satisfies Track
