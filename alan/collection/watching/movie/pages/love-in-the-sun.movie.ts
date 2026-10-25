import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInTheSun = {
  id: "01a17499-e804-7b1c-9bdb-8600309397c3",
  type: "page-type/movie",
  slug: "love-in-the-sun",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594697",
      externalLink: "https://www.themoviedb.org/movie/594697",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in the Sun",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10136864",
  posterPath: "/7cI4NE5TM7jUKHnFEVGkAsxXy9g.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
