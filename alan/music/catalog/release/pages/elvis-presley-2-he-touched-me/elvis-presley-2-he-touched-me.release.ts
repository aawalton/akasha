import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2HeTouchedMe = {
  id: "01a0676a-d720-7006-9562-59d46154adba",
  type: "page-type/release",
  slug: "elvis-presley-2-he-touched-me",
  title: "He Touched Me",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 30.479483,
  ownProgress: 30.479483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1972-04-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4BcD1RBud4U2DAqByYFBi2",
      externalLink: "https://open.spotify.com/album/4BcD1RBud4U2DAqByYFBi2",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
