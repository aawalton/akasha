import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murderWithoutConviction = {
  id: "01a17497-3829-781d-af03-d5314e3d9705",
  type: "page-type/movie",
  slug: "murder-without-conviction",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2004-09-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "74900",
      externalLink: "https://www.themoviedb.org/movie/74900",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder Without Conviction",
  genres: ["Thriller", "TV Movie", "Mystery"],
  imdbId: "tt0397367",
  posterPath: "/gxFAF9Yuw6izwN1wjUz6UJpaOm3.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
