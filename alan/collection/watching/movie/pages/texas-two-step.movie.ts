import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const texasTwoStep = {
  id: "01a1749a-c86b-7e3d-941a-5f20f46a3c0f",
  type: "page-type/movie",
  slug: "texas-two-step",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1686831",
      externalLink: "https://www.themoviedb.org/movie/1686831",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Texas Two-Step",
  genres: ["Romance"],
  imdbId: "tt42277796",
  posterPath: "/7nucaGVe1vCE3ilWgDskFrQrtiK.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
