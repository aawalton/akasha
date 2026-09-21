import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBelieverKaskadeRemix = {
  id: "01a0676a-d718-703b-9ac6-5117b7febf9f",
  type: "page-type/release",
  slug: "imagine-dragons-believer-kaskade-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2017-06-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2wVV49qXJai8kmCb1Czp0p",
      externalLink: "https://open.spotify.com/album/2wVV49qXJai8kmCb1Czp0p",
    },
  ],
  title: "Believer (Kaskade Remix)",
} as const satisfies Release
