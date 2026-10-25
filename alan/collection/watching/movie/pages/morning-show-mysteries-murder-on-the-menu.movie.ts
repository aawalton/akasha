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
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
