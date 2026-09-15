import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallLoveOneAnother = {
  id: "01a0676a-d723-7079-b0a4-47e52cd3d35f",
  type: "page-type/release",
  slug: "paul-cardall-love-one-another",
  title: "Love One Another",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 4.01385,
  ownProgress: 4.01385,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-03-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1VUpyrlgbc6TKYFNacYIpD",
      externalLink: "https://open.spotify.com/album/1VUpyrlgbc6TKYFNacYIpD",
    },
  ],
} as const satisfies Release
