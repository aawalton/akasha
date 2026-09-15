import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoSis = {
  id: "01a0676a-d729-7012-a9fb-e4adec2747b2",
  type: "page-type/release",
  slug: "clairo-sis",
  title: "Sis",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 2.271333,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-02-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tGZsYEJXwkOnnTGuHTrli",
      externalLink: "https://open.spotify.com/album/0tGZsYEJXwkOnnTGuHTrli",
    },
  ],
} as const satisfies Release
