import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theProfessionalBridesmaid = {
  id: "01a1749a-66c1-7703-9b7f-0b7325c34cba",
  type: "page-type/movie",
  slug: "the-professional-bridesmaid",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093400",
      externalLink: "https://www.themoviedb.org/movie/1093400",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Professional Bridesmaid",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27010283",
  posterPath: "/oP7yDAAry175apwZH7j49E4eMxL.jpg",
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
