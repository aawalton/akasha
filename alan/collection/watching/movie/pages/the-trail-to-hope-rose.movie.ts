import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theTrailToHopeRose = {
  id: "01a17497-382b-79e9-bce7-1e9ca8ef5eea",
  type: "page-type/movie",
  slug: "the-trail-to-hope-rose",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "68940",
      externalLink: "https://www.themoviedb.org/movie/68940",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Trail to Hope Rose",
  genres: ["Action", "TV Movie", "Western"],
  imdbId: "tt0402260",
  posterPath: "/nJ5fd9UQYEMQsoeTgbUCpGRdIA3.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
