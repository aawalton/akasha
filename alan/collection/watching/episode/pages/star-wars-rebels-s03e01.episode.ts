import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e01 = {
  id: "01a18853-ddfd-7ee5-9d97-d55c9c6fcf63",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e01",
  description:
    "Ezra, Sabine, Zeb, Chopper and Hera sets out to rescue Hondo Ohnaka, while Kanan finds an ancient force creature know as The Bendu.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 1,
  publishedAt: "2016-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1224349",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/1",
    },
  ],
  title: "Steps Into Shadow",
  episodeType: "standard",
  stillPath: "/qRWrLjrnAPvID7LxcFlZ5SwlRvg.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
