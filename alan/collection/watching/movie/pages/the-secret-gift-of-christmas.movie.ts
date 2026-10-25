import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSecretGiftOfChristmas = {
  id: "01a1749a-89ac-7aa5-a62e-708ad45f2343",
  type: "page-type/movie",
  slug: "the-secret-gift-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180686",
      externalLink: "https://www.themoviedb.org/movie/1180686",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Secret Gift of Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28753331",
  posterPath: "/sVRiiNfen5uEQPGXsHSToS3TnPS.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
