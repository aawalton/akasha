import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasUnderWraps = {
  id: "01a17499-8944-79fc-afc5-8ddc98de5eb5",
  type: "page-type/movie",
  slug: "christmas-under-wraps",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299584",
      externalLink: "https://www.themoviedb.org/movie/299584",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Under Wraps",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt4180032",
  posterPath: "/r2tadWhvP5oyRma1aYrVtAIQMe9.jpg",
  voteAverage: 5.882,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
