import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPerfumeMedley = {
  id: "01a0676a-d726-7071-b7b6-122edde328eb",
  type: "page-type/release",
  slug: "pentatonix-perfume-medley",
  title: "Perfume Medley",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 2.21955,
  ownProgress: 2.21955,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-08-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3PMe1M0mKrfKZhtdoJuwQy",
      externalLink: "https://open.spotify.com/album/3PMe1M0mKrfKZhtdoJuwQy",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
