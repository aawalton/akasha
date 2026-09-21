import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallLoveOneAnother = {
  id: "01a0676a-d723-7079-b0a4-47e52cd3d35f",
  type: "page-type/release",
  slug: "paul-cardall-love-one-another",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-03-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1VUpyrlgbc6TKYFNacYIpD",
      externalLink: "https://open.spotify.com/album/1VUpyrlgbc6TKYFNacYIpD",
    },
  ],
  title: "Love One Another",
} as const satisfies Release
