import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const capricaS01e01 = {
  id: "01a18843-f130-7cc4-9831-5c70093e5250",
  type: "page-type/episode",
  slug: "caprica-s01e01",
  description:
    "On the vibrant world of Caprica, in a culture recognizably close to our own, two dynamic families - the Graystones and the Adamas - live separately on opposite ends of society until they are brought together by tragedy.",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["season/caprica-season-1"],
  position: 1,
  publishedAt: "2010-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1164892",
      externalLink: "https://www.themoviedb.org/tv/877/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/Bq9a72Hb4egqadSaX3sTNYDJ3c.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:25:16.463Z",
  updatedAt: "2026-10-29T15:25:16.463Z",
} as const satisfies Episode
