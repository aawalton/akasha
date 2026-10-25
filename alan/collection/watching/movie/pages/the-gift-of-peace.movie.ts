import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGiftOfPeace = {
  id: "01a1749a-66c0-75ef-afce-cffd5a48bb3d",
  type: "page-type/movie",
  slug: "the-gift-of-peace",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028549",
      externalLink: "https://www.themoviedb.org/movie/1028549",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Gift of Peace",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22308928",
  posterPath: "/u7vdyi8YUtoAg0DEhQOd06BsIoA.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
