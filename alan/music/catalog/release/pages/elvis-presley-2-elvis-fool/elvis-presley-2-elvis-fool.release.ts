import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ElvisFool = {
  id: "01a0676a-d71c-706f-a5cf-ab7d0936b1e0",
  type: "release",
  slug: "elvis-presley-2-elvis-fool",
  title: "Elvis (Fool)",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 45.4317,
  ownProgress: 45.4317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1973-07-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3gpHiNAmT5oXVxe6ewTGuN",
      externalLink: "https://open.spotify.com/album/3gpHiNAmT5oXVxe6ewTGuN",
    },
  ],
} as const satisfies Release
