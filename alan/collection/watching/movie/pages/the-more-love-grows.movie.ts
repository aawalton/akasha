import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMoreLoveGrows = {
  id: "01a1749a-89ac-7ebc-8f91-aef7518bc1bb",
  type: "page-type/movie",
  slug: "the-more-love-grows",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146921",
      externalLink: "https://www.themoviedb.org/movie/1146921",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The More Love Grows",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28511586",
  posterPath: "/ehUwoQUnFZ8vo1gg1JCTMKFXScs.jpg",
  voteAverage: 7.2,
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
