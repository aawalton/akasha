import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aDecemberBride = {
  id: "01a17499-a7d2-7916-95df-6fa5ddece65a",
  type: "page-type/movie",
  slug: "a-december-bride",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "427045",
      externalLink: "https://www.themoviedb.org/movie/427045",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A December Bride",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5739680",
  posterPath: "/bSMbRlQkMrHyB71B4gA5oEK5Uh.jpg",
  voteAverage: 7.168,
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
