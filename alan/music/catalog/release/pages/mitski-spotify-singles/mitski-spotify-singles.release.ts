import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiSpotifySingles = {
  id: "01a0676a-d72a-7000-9134-106ccf4008ed",
  type: "page-type/release",
  slug: "mitski-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 5.6022,
  ownProgress: 5.6022,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2024-03-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7424HIQbzV8bI0JSYwTFni",
      externalLink: "https://open.spotify.com/album/7424HIQbzV8bI0JSYwTFni",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
