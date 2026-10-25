import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timelessLove = {
  id: "01a1749a-259e-797b-b012-0b32bde41a32",
  type: "page-type/movie",
  slug: "timeless-love",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2020-06-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1254257",
      externalLink: "https://www.themoviedb.org/movie/1254257",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Timeless Love",
  genres: ["Romance"],
  imdbId: "tt19316618",
  posterPath: "/8AFzQWnWuclfDPrZ5nwzNmh2Ptb.jpg",
  voteAverage: 3,
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
