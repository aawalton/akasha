import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lifeOnLibertyStreet = {
  id: "01a17497-3827-7136-ad1a-6afbeaa6bf5c",
  type: "page-type/movie",
  slug: "life-on-liberty-street",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "124341",
      externalLink: "https://www.themoviedb.org/movie/124341",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Life on Liberty Street",
  genres: ["Drama", "Romance"],
  imdbId: "tt0399281",
  posterPath: "/nMRBCuH52vU0PpOjUNKVZBhKFOC.jpg",
  voteAverage: 4.6,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
