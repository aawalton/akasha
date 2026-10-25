import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const merryBright = {
  id: "01a17499-e804-74f0-bf78-1c7124ae41c1",
  type: "page-type/movie",
  slug: "merry-bright",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626307",
      externalLink: "https://www.themoviedb.org/movie/626307",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Merry & Bright",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10345022",
  posterPath: "/gtEBjPz7xGkmvWPdLLdiIq19fhg.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The Roku Channel",
    "Xumo Play",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
