import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayBiutyful = {
  id: "01a0676a-d719-7011-b76e-822579b80dde",
  type: "page-type/release",
  slug: "coldplay-biutyful",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2022-07-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "574iaZA34RiT9rM1F2s2IM",
      externalLink: "https://open.spotify.com/album/574iaZA34RiT9rM1F2s2IM",
    },
  ],
  title: "Biutyful",
} as const satisfies Release
