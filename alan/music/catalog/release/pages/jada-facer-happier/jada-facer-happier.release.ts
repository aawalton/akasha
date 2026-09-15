import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerHappier = {
  id: "01a0676a-d71f-7045-b063-12d0edc2d66d",
  type: "page-type/release",
  slug: "jada-facer-happier",
  title: "Happier",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.881617,
  ownProgress: 2.881617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "402QyvwBjb0uNy56hA1R9V",
      externalLink: "https://open.spotify.com/album/402QyvwBjb0uNy56hA1R9V",
    },
  ],
} as const satisfies Release
