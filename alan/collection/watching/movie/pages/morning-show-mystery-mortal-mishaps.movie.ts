import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const morningShowMysteryMortalMishaps = {
  id: "01a17499-e805-720f-b232-2543f799e13d",
  type: "page-type/movie",
  slug: "morning-show-mystery-mortal-mishaps",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/morning-show-mysteries"],
  position: 1,
  publishedAt: "2018-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "500114",
      externalLink: "https://www.themoviedb.org/movie/500114",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mystery: Mortal Mishaps",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt7785090",
  posterPath: "/x7gLsQYNMRSgzF1gPRs53oFekxK.jpg",
  voteAverage: 7.087,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
