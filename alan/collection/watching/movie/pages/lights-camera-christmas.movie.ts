import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lightsCameraChristmas = {
  id: "01a1749a-464b-7eca-9562-c912dca84852",
  type: "page-type/movie",
  slug: "lights-camera-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027439",
      externalLink: "https://www.themoviedb.org/movie/1027439",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lights, Camera, Christmas!",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22246560",
  posterPath: "/xensL98L0bGnkkQsEFy3USC5n5Y.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
