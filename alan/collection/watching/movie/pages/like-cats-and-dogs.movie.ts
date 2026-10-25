import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const likeCatsAndDogs = {
  id: "01a17499-a7d5-7a34-a450-43fb5e68861b",
  type: "page-type/movie",
  slug: "like-cats-and-dogs",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "446866",
      externalLink: "https://www.themoviedb.org/movie/446866",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Like Cats and Dogs",
  genres: ["Comedy", "TV Movie", "Romance"],
  imdbId: "tt6669590",
  posterPath: "/qNrwBi4NtRoMub89DjYWwtMDOr5.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
