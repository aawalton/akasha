import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const xmas = {
  id: "01a1749a-464f-73b3-97e1-b95faab08e69",
  type: "page-type/movie",
  slug: "xmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028550",
      externalLink: "https://www.themoviedb.org/movie/1028550",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Xmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt9892854",
  posterPath: "/675FCHUSN10vzfW4V2BB2udHxdb.jpg",
  voteAverage: 5.419,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
