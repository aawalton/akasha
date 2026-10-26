import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const shipsInTheNightAMarthaSVineyardMystery = {
  id: "01a1749a-464d-7857-a542-0c326ad5bb9e",
  type: "page-type/movie",
  slug: "ships-in-the-night-a-martha-s-vineyard-mystery",
  ownLength: 84,
  ownProgress: 84,
  partOfCollections: ["franchise/a-martha-s-vineyard-mystery"],
  position: 3,
  publishedAt: "2021-01-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "775162",
      externalLink: "https://www.themoviedb.org/movie/775162",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ships in the Night: A Martha's Vineyard Mystery",
  genres: ["Mystery", "TV Movie", "Crime"],
  imdbId: "tt13365786",
  posterPath: "/eGRJawXxHwmH9k1HtXUDE7nbQUx.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-26T19:01:45.943Z",
  completedAt: "2026-10-26T19:01:44.819Z",
  progressedAt: "2026-10-26T19:01:45.943Z",
} as const satisfies Movie
