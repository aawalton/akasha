import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const elvisPresley2ElvisSingsFlamingStar = {
  id: "01a0676a-d71d-7006-a7b5-2731ec771c6d",
  type: "release",
  slug: "elvis-presley-2-elvis-sings-flaming-star",
  title: "Elvis Sings Flaming Star",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 20.4133,
  ownProgress: 20.4133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1968-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3xHHQWEtennMsfZ65t9Brv",
      externalLink: "https://open.spotify.com/album/3xHHQWEtennMsfZ65t9Brv",
    },
  ],
} as const satisfies Release
