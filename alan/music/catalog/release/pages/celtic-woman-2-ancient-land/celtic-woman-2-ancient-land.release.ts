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
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
