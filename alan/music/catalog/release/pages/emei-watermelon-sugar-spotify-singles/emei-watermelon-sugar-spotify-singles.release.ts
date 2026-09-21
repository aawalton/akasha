import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiWatermelonSugarSpotifySingles = {
  id: "01a0676a-d730-7023-849e-f99e80c4a7da",
  type: "page-type/release",
  slug: "emei-watermelon-sugar-spotify-singles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-05-15",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kKBZgTc90Mdudfsu3bDl3",
      externalLink: "https://open.spotify.com/album/0kKBZgTc90Mdudfsu3bDl3",
    },
  ],
  title: "Watermelon Sugar (Spotify Singles)",
} as const satisfies Release
