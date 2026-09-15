import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiWatermelonSugarSpotifySingles = {
  id: "01a0676a-d730-7023-849e-f99e80c4a7da",
  type: "page-type/release",
  slug: "emei-watermelon-sugar-spotify-singles",
  title: "Watermelon Sugar (Spotify Singles)",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.160933,
  ownProgress: 2.160933,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-05-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kKBZgTc90Mdudfsu3bDl3",
      externalLink: "https://open.spotify.com/album/0kKBZgTc90Mdudfsu3bDl3",
    },
  ],
} as const satisfies Release
