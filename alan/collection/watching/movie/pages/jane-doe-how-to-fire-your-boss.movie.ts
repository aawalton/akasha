import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeHowToFireYourBoss = {
  id: "01a17497-3826-7449-806a-d5f226beb41f",
  type: "page-type/movie",
  slug: "jane-doe-how-to-fire-your-boss",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 7,
  publishedAt: "2007-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "105460",
      externalLink: "https://www.themoviedb.org/movie/105460",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: How To Fire Your Boss",
  genres: ["Action", "Thriller", "Crime", "Mystery", "TV Movie"],
  imdbId: "tt0811777",
  posterPath: "/l46aGhS2by8wEK3nrqUWJlWo8B2.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
