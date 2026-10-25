import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jackSFamilyAdventure = {
  id: "01a17499-470d-74f9-91d5-4beed7a4a16a",
  type: "page-type/movie",
  slug: "jack-s-family-adventure",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-07-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "354661",
      externalLink: "https://www.themoviedb.org/movie/354661",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jack's Family Adventure",
  genres: ["TV Movie", "Adventure", "Family"],
  imdbId: "tt1324060",
  posterPath: "/czAxyv7t19Z1B4eF8QCZoH0PgQh.jpg",
  voteAverage: 7,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
