import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anUnexpectedChristmas = {
  id: "01a1749a-2599-7037-879b-145507a63706",
  type: "page-type/movie",
  slug: "an-unexpected-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874124",
      externalLink: "https://www.themoviedb.org/movie/874124",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Unexpected Christmas",
  genres: ["Comedy", "Romance", "Drama"],
  imdbId: "tt15766640",
  posterPath: "/xX3396RcIQynrulZHFlE1DqAOfy.jpg",
  voteAverage: 6.279,
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
