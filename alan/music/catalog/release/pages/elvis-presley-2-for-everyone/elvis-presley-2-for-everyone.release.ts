import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ForEveryone = {
  id: "01a0676a-d71e-7023-97ca-d933feaff9d7",
  type: "release",
  slug: "elvis-presley-2-for-everyone",
  title: "For Everyone",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 24.2032,
  ownProgress: 24.2032,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tYYM9PPjEM7W7aIR7VO8a",
      externalLink: "https://open.spotify.com/album/0tYYM9PPjEM7W7aIR7VO8a",
    },
  ],
} as const satisfies Release
