import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeWhatGoesAroundComesAroundTheRemixes = {
  id: "01a0676a-d730-7044-a5a1-bd4762d6db76",
  type: "page-type/release",
  slug: "justin-timberlake-what-goes-around-comes-around-the-remixes",
  title: "What Goes Around... Comes Around The Remixes",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 41.688883,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-02-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6G2boZuVyTIIxlmTG52NsI",
      externalLink: "https://open.spotify.com/album/6G2boZuVyTIIxlmTG52NsI",
    },
  ],
} as const satisfies Release
