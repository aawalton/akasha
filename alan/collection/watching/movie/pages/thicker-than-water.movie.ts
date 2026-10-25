import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thickerThanWater = {
  id: "01a17497-382b-7676-996e-7d7cb591b886",
  type: "page-type/movie",
  slug: "thicker-than-water",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54796",
      externalLink: "https://www.themoviedb.org/movie/54796",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Thicker_than_Water_(2005_film)",
    },
  ],
  title: "Thicker than Water",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt0433649",
  posterPath: "/kjDaxsWZxXvOXSJBGAvqlwGg9sy.jpg",
  voteAverage: 6.382,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
