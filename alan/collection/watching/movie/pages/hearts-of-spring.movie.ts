import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartsOfSpring = {
  id: "01a17499-a7d5-7ce1-bf5d-fbe83cf50624",
  type: "page-type/movie",
  slug: "hearts-of-spring",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "383627",
      externalLink: "https://www.themoviedb.org/movie/383627",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hearts of Spring",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5643768",
  posterPath: "/dMPIYVG94bhJBVf0lKLsLcm2yW.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
