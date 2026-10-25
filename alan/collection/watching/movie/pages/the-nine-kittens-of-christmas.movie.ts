import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNineKittensOfChristmas = {
  id: "01a1749a-259e-7f32-a829-012e9442aabc",
  type: "page-type/movie",
  slug: "the-nine-kittens-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-nine-lives-of-christmas"],
  position: 1,
  publishedAt: "2021-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "876119",
      externalLink: "https://www.themoviedb.org/movie/876119",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Nine Kittens of Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama", "Fantasy"],
  imdbId: "tt15226096",
  posterPath: "/gGI5PXdfgwvj3S7J9hLE6Acsfy6.jpg",
  voteAverage: 6.902,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
