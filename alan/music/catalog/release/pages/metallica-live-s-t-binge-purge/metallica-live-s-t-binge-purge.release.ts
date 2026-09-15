import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaLiveSTBingePurge = {
  id: "01a0676a-d723-7054-bfaf-8ebc831bcfd4",
  type: "page-type/release",
  slug: "metallica-live-s-t-binge-purge",
  title: "Live S**t: Binge & Purge",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 177.172733,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1993-11-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iBN00FZaKlaXVYfxV7bBQ",
      externalLink: "https://open.spotify.com/album/4iBN00FZaKlaXVYfxV7bBQ",
    },
  ],
} as const satisfies Release
