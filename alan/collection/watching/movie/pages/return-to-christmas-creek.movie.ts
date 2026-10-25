import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const returnToChristmasCreek = {
  id: "01a17499-e805-73e1-8a1e-2c21d0f65074",
  type: "page-type/movie",
  slug: "return-to-christmas-creek",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "554279",
      externalLink: "https://www.themoviedb.org/movie/554279",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Return to Christmas Creek",
  genres: ["Romance", "Family", "TV Movie"],
  imdbId: "tt9103028",
  posterPath: "/gCdjZCWM9x9vAbtkvZiIIYL7tOB.jpg",
  voteAverage: 6.431,
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
