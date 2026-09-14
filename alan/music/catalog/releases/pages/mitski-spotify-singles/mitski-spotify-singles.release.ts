import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const mitskiSpotifySingles = {
  id: "01a0676a-d72a-7000-9134-106ccf4008ed",
  type: "release",
  slug: "mitski-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 5.6022,
  ownProgress: 5.6022,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2024-03-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7424HIQbzV8bI0JSYwTFni",
      externalLink: "https://open.spotify.com/album/7424HIQbzV8bI0JSYwTFni",
    },
  ],
} as const satisfies Release
