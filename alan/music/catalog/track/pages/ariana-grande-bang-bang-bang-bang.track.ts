import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangBangBang = {
  id: "01a0a6c5-3ce8-79ab-8e10-1ef7c946f2da",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-bang-bang",
  ownLength: 3.32295,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-bang-bang"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7I1IALTGkjzWa3fAmB3NAh",
      externalLink: "https://open.spotify.com/track/7I1IALTGkjzWa3fAmB3NAh",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey: "bangbang|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|199377",
  song: "song/ariana-grande-bang-bang",
} as const satisfies Track
