import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2LovingYou = {
  id: "01a0676a-d724-7010-a404-680596e81bee",
  type: "page-type/release",
  slug: "elvis-presley-2-loving-you",
  title: "Loving You",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 28.613233,
  ownProgress: 28.613233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1957-06-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KZSeiE569txmIxoNBQLS2",
      externalLink: "https://open.spotify.com/album/7KZSeiE569txmIxoNBQLS2",
    },
  ],
} as const satisfies Release
