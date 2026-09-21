import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishDontSmileAtMe = {
  id: "01a0676a-d71c-702a-b990-601bf6f681a5",
  type: "page-type/release",
  slug: "billie-eilish-dont-smile-at-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-12-22",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7fRrTyKvE4Skh93v97gtcU",
      externalLink: "https://open.spotify.com/album/7fRrTyKvE4Skh93v97gtcU",
    },
  ],
  title: "dont smile at me",
} as const satisfies Release
