import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const smallTownChristmas = {
  id: "01a17499-e806-791a-b30d-01952300c9a2",
  type: "page-type/movie",
  slug: "small-town-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "555277",
      externalLink: "https://www.themoviedb.org/movie/555277",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Small Town Christmas",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt9168416",
  posterPath: "/1ofOSade5htAKST44j1q8oXqOFv.jpg",
  voteAverage: 6.427,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
