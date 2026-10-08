import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerGraveyard = {
  id: "01a0676a-d71f-7028-aff2-458de7dd85e6",
  type: "page-type/release",
  slug: "jada-facer-graveyard",
  title: "Graveyard",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.76035,
  ownProgress: 2.76035,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-10-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4k1RZZYFzalAf1ayAepAgf",
      externalLink: "https://open.spotify.com/album/4k1RZZYFzalAf1ayAepAgf",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
