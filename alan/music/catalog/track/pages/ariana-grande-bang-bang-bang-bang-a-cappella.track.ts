import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangBangBangACappella = {
  id: "01a0a6c5-3d07-762c-a123-d310299adca5",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-bang-bang-a-cappella",
  ownLength: 3.282766666666667,
  ownProgress: 3.282766666666667,
  partOfCollections: ["release/ariana-grande-bang-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bang Bang - A Cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [
    { artistName: "Jessie J" },
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
  ],
  trackKey:
    "bangbangacappella|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|196966",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-bang-bang",
      discNumber: 1,
      position: 2,
      externalId: "6yVBEzJYg7olnFeH0vNsTw",
      externalLink: "https://open.spotify.com/track/6yVBEzJYg7olnFeH0vNsTw",
    },
  ],
} as const satisfies Track
