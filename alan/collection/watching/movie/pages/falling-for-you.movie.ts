import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingForYou = {
  id: "01a17499-c95c-73f1-a261-fdbe0611f940",
  type: "page-type/movie",
  slug: "falling-for-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "544594",
      externalLink: "https://www.themoviedb.org/movie/544594",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling for You",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt8989874",
  posterPath: "/w59zNlB2qFNe313A441r5t8oFgk.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
