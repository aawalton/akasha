import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const happyHolidaysFromCherryLane = {
  id: "01a1749a-a94a-7ba8-9eae-5c059186d012",
  type: "page-type/movie",
  slug: "happy-holidays-from-cherry-lane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359233",
      externalLink: "https://www.themoviedb.org/movie/1359233",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Happy Holidays from Cherry Lane",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33455348",
  posterPath: "/ute5VSPVNF9U6koCjIpQM0b8X7E.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
