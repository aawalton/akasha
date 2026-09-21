import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2PostcardsFromIreland = {
  id: "01a0676a-d727-700d-b3fa-9e7cab50ef9d",
  type: "page-type/release",
  slug: "celtic-woman-2-postcards-from-ireland",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2021-10-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6MEFNhfXzOAOiBjPLiPdhm",
      externalLink: "https://open.spotify.com/album/6MEFNhfXzOAOiBjPLiPdhm",
    },
  ],
  title: "Postcards From Ireland",
} as const satisfies Release
