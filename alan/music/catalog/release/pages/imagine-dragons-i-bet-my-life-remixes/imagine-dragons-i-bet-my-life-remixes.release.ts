import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsIBetMyLifeRemixes = {
  id: "01a0676a-d721-7002-8ee7-895ee1ccda29",
  type: "page-type/release",
  slug: "imagine-dragons-i-bet-my-life-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VTwHlsilffsneBm3LbZef",
      externalLink: "https://open.spotify.com/album/6VTwHlsilffsneBm3LbZef",
    },
  ],
  title: "I Bet My Life (Remixes)",
} as const satisfies Release
