import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourHolidayStory = {
  id: "01a1749a-89aa-7045-9d22-9ed27b21ca0a",
  type: "page-type/movie",
  slug: "our-holiday-story",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360780",
      externalLink: "https://www.themoviedb.org/movie/1360780",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our Holiday Story",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33437460",
  posterPath: "/15TXQSd0RerDV7XNtOcTNhnfhOq.jpg",
  voteAverage: 6,
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
