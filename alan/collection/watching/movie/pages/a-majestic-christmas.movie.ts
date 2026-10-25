import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMajesticChristmas = {
  id: "01a17499-e800-7284-bb21-7f8002b7a385",
  type: "page-type/movie",
  slug: "a-majestic-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550028",
      externalLink: "https://www.themoviedb.org/movie/550028",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Majestic Christmas",
  genres: ["TV Movie", "Drama", "Romance", "Comedy"],
  imdbId: "tt9033636",
  posterPath: "/vUL1DWP6RHx0BYE8999P9urfbnl.jpg",
  voteAverage: 5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
