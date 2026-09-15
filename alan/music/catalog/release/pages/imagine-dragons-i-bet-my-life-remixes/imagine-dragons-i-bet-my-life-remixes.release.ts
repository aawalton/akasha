import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsIBetMyLifeRemixes = {
  id: "01a0676a-d721-7002-8ee7-895ee1ccda29",
  type: "page-type/release",
  slug: "imagine-dragons-i-bet-my-life-remixes",
  title: "I Bet My Life (Remixes)",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 16.067767,
  ownProgress: 16.067767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VTwHlsilffsneBm3LbZef",
      externalLink: "https://open.spotify.com/album/6VTwHlsilffsneBm3LbZef",
    },
  ],
} as const satisfies Release
