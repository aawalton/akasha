import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunawayGuitarAcoustic = {
  id: "01a0676a-d728-702c-8d78-116b7905522a",
  type: "page-type/release",
  slug: "aurora-runaway-guitar-acoustic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-03-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7uQthS05o2ZP9NxupuFzbp",
      externalLink: "https://open.spotify.com/album/7uQthS05o2ZP9NxupuFzbp",
    },
  ],
  title: "Runaway (Guitar Acoustic)",
} as const satisfies Release
