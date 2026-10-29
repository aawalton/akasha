import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e12 = {
  id: "01a18843-1871-74a5-9501-2f4479d082e8",
  type: "page-type/episode",
  slug: "andor-s02e12",
  description: "Cassian returns to Yavin with intel that will change everything.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 12,
  publishedAt: "2025-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747441",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/12",
    },
  ],
  title: "Jedha, Kyber, Erso",
  episodeType: "finale",
  stillPath: "/qOamngh93us1GyBo5lMkIwMr2do.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
