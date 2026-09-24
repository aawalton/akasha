import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdNumbLittleBug = {
  id: "01a0676a-d726-7006-8b99-4b39de57f92a",
  type: "page-type/release",
  slug: "em-beihold-numb-little-bug",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2022-01-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20zaiRxxUfDqdCKsdSo7HM",
      externalLink: "https://open.spotify.com/album/20zaiRxxUfDqdCKsdSo7HM",
    },
  ],
  title: "Numb Little Bug",
} as const satisfies Release
