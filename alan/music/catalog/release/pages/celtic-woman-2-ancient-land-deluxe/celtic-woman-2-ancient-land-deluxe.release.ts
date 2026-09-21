import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2AncientLandDeluxe = {
  id: "01a0676a-d717-7014-ae5f-9c3a0bda83ca",
  type: "page-type/release",
  slug: "celtic-woman-2-ancient-land-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2019-09-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZOqSYigcCAMN9KTd2mVZK",
      externalLink: "https://open.spotify.com/album/6ZOqSYigcCAMN9KTd2mVZK",
    },
  ],
  title: "Ancient Land (Deluxe)",
} as const satisfies Release
