import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theCurseOfKingTutSTomb = {
  id: "01a17497-382a-7a0d-ac47-796336ea0d8a",
  type: "page-type/movie",
  slug: "the-curse-of-king-tut-s-tomb",
  ownLength: 170,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15056",
      externalLink: "https://www.themoviedb.org/movie/15056",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Curse_of_King_Tut's_Tomb_(2006_film)",
    },
  ],
  title: "The Curse of King Tut's Tomb",
  genres: ["Action", "Adventure", "Fantasy", "Thriller", "Horror"],
  imdbId: "tt0464799",
  posterPath: "/lS8HiWOO7YcezktLKFmBJmitAzo.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
