import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const girlfriendship = {
  id: "01a1749a-464b-7999-b7c7-cd6d563c6604",
  type: "page-type/movie",
  slug: "girlfriendship",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "983242",
      externalLink: "https://www.themoviedb.org/movie/983242",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Girlfriendship",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt21969154",
  posterPath: "/wWnlTbLNXcDEtl9tudSIra5fxYI.jpg",
  voteAverage: 6.9,
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
