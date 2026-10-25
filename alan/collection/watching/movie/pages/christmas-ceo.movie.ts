import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasCeo = {
  id: "01a1749a-2599-7076-ad62-aebde11334a2",
  type: "page-type/movie",
  slug: "christmas-ceo",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874193",
      externalLink: "https://www.themoviedb.org/movie/874193",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas CEO",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt15691922",
  posterPath: "/sEr64YRNev9EW7YIyUqpcxK8Z9T.jpg",
  voteAverage: 5.6,
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
