import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishHappierThanEverEdit = {
  id: "01a0676a-d71f-7049-be61-a6210b9a36db",
  type: "page-type/release",
  slug: "billie-eilish-happier-than-ever-edit",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2021-07-28",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kzPJWrTjVKEYWWhowXLnz",
      externalLink: "https://open.spotify.com/album/2kzPJWrTjVKEYWWhowXLnz",
    },
  ],
  title: "Happier Than Ever (Edit)",
} as const satisfies Release
