import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jingleAroundTheClock = {
  id: "01a17499-e803-7e53-a0c4-bef74f9311c6",
  type: "page-type/movie",
  slug: "jingle-around-the-clock",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "551701",
      externalLink: "https://www.themoviedb.org/movie/551701",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jingle Around the Clock",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt9168384",
  posterPath: "/dz6Fp3TpIsmGughXqKy5iJW35me.jpg",
  voteAverage: 6.691,
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
