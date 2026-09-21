import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayOrphansMuziRemix = {
  id: "01a0676a-d726-704e-ae98-919188f7e9d5",
  type: "page-type/release",
  slug: "coldplay-orphans-muzi-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2019-11-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BFaHYLKy6IvNfD0zi5EQW",
      externalLink: "https://open.spotify.com/album/2BFaHYLKy6IvNfD0zi5EQW",
    },
  ],
  title: "Orphans (Muzi Remix)",
} as const satisfies Release
