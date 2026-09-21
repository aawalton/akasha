import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardall40HymnsForFortyDays = {
  id: "01a0676a-d715-700b-8a94-991029e7934e",
  type: "page-type/release",
  slug: "paul-cardall-40-hymns-for-forty-days",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2015-04-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ymk0K20Sx1CJQkQ0q56CN",
      externalLink: "https://open.spotify.com/album/1Ymk0K20Sx1CJQkQ0q56CN",
    },
  ],
  title: "40 Hymns for Forty Days",
} as const satisfies Release
