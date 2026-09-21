import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraWhatHappenedToTheHeart = {
  id: "01a0676a-d730-7045-a222-4328473df7e1",
  type: "page-type/release",
  slug: "aurora-what-happened-to-the-heart",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2024-06-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TVgUkZ0mlosNNcJYsgTeV",
      externalLink: "https://open.spotify.com/album/6TVgUkZ0mlosNNcJYsgTeV",
    },
  ],
  title: "What Happened To The Heart?",
} as const satisfies Release
