import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayTouchdownABearsLoveStory = {
  id: "01a1749a-c869-74d3-a7a0-e97119809925",
  type: "page-type/movie",
  slug: "holiday-touchdown-a-bears-love-story",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/holiday-touchdown"],
  position: 3,
  publishedAt: "2026-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1729134",
      externalLink: "https://www.themoviedb.org/movie/1729134",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Touchdown: A Bears Love Story",
  genres: ["Drama", "TV Movie", "Comedy", "Romance"],
  imdbId: "tt43662087",
  posterPath: "/gEa1lZxMoxWakkcdYll9444Mf88.jpg",
  voteAverage: 5.333,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T20:45:31.132Z",
} as const satisfies Movie
