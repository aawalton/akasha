import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtThePalace = {
  id: "01a17499-e801-7144-b1c8-ab0fc96ede0a",
  type: "page-type/movie",
  slug: "christmas-at-the-palace",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550023",
      externalLink: "https://www.themoviedb.org/movie/550023",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at the Palace",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9033632",
  posterPath: "/lD6xv3dz6AStcYsrDk6sqHKMgxD.jpg",
  voteAverage: 6.4,
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
