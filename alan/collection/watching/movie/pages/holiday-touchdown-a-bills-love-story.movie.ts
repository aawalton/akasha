import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayTouchdownABillsLoveStory = {
  id: "01a1749a-a94b-795c-a1dd-88cdc9e9c2ea",
  type: "page-type/movie",
  slug: "holiday-touchdown-a-bills-love-story",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/holiday-touchdown"],
  position: 2,
  publishedAt: "2025-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1485002",
      externalLink: "https://www.themoviedb.org/movie/1485002",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Touchdown: A Bills Love Story",
  genres: ["Romance", "Comedy", "Family"],
  imdbId: "tt36604797",
  posterPath: "/hpkykimE5Rx8nsDoB0skhycCTTH.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T20:45:28.240Z",
} as const satisfies Movie
