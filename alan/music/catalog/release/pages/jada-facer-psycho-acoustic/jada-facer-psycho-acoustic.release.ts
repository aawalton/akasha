import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerPsychoAcoustic = {
  id: "01a0676a-d727-7029-ab4f-6a399dd1a941",
  type: "release",
  slug: "jada-facer-psycho-acoustic",
  title: "Psycho - Acoustic",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.615533,
  ownProgress: 2.615533,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-04-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qshnXS0qjMbHs1B4ogCTd",
      externalLink: "https://open.spotify.com/album/3qshnXS0qjMbHs1B4ogCTd",
    },
  ],
} as const satisfies Release
