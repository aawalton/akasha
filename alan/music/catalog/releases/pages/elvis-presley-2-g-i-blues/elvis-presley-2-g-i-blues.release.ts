import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const elvisPresley2GIBlues = {
  id: "01a0676a-d71e-704b-b336-586c3b0b27a8",
  type: "release",
  slug: "elvis-presley-2-g-i-blues",
  title: "G.I. Blues",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 27.92015,
  ownProgress: 27.92015,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1960-09-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1TqAYM0PTj6TDdzTcY8VGT",
      externalLink: "https://open.spotify.com/album/1TqAYM0PTj6TDdzTcY8VGT",
    },
  ],
} as const satisfies Release
