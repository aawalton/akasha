import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasUnderTheStars = {
  id: "01a17499-e802-7e5a-97df-4ddad802c6b5",
  type: "page-type/movie",
  slug: "christmas-under-the-stars",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "629985",
      externalLink: "https://www.themoviedb.org/movie/629985",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Under the Stars",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10922658",
  posterPath: "/zjNW72nSDBNYduhD1wf0EBWVhNl.jpg",
  voteAverage: 6.482,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
