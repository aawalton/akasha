import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const morningShowMysteriesMurderOnTheMenu = {
  id: "01a17499-e805-771f-a19e-305fadf442f4",
  type: "page-type/movie",
  slug: "morning-show-mysteries-murder-on-the-menu",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/morning-show-mysteries"],
  position: 2,
  publishedAt: "2018-07-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "536685",
      externalLink: "https://www.themoviedb.org/movie/536685",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mysteries: Murder on the Menu",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt8498352",
  posterPath: "/5abfoJO62rlaA048uWw4ltecsGm.jpg",
  voteAverage: 6.739,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
