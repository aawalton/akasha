import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAscensus = {
  id: "01a0676a-d717-7036-98d0-2ddddc58fd96",
  type: "page-type/release",
  slug: "paul-cardall-ascensus",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2025-05-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZUz8GuEhTlA5t6zSm7FQa",
      externalLink: "https://open.spotify.com/album/6ZUz8GuEhTlA5t6zSm7FQa",
    },
  ],
  title: "Ascensus",
} as const satisfies Release
