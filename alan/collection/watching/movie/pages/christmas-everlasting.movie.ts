import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasEverlasting = {
  id: "01a17499-e802-7a42-ab16-8172caea7148",
  type: "page-type/movie",
  slug: "christmas-everlasting",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "549319",
      externalLink: "https://www.themoviedb.org/movie/549319",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Everlasting",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt9028802",
  posterPath: "/w72W4gj27NvMnTsw7aw1cwUFnC1.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The Roku Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
