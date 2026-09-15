import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangBangBangACappella = {
  id: "01a0a6c5-3d07-762c-a123-d310299adca5",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-bang-bang-a-cappella",
  ownLength: 3.282766666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-bang-bang"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6yVBEzJYg7olnFeH0vNsTw",
      externalLink: "https://open.spotify.com/track/6yVBEzJYg7olnFeH0vNsTw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang - A Cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey:
    "bangbangacappella|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|196966",
} as const satisfies Track
