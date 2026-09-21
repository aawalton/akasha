import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2AncientLand = {
  id: "01a0676a-d717-7013-b63a-a546988aa9dc",
  type: "page-type/release",
  slug: "celtic-woman-2-ancient-land",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2018-09-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JP6VJccHYWKPckmRpayOP",
      externalLink: "https://open.spotify.com/album/6JP6VJccHYWKPckmRpayOP",
    },
  ],
  title: "Ancient Land",
} as const satisfies Release
