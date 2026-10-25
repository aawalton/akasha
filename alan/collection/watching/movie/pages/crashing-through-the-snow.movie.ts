import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crashingThroughTheSnow = {
  id: "01a1749a-259a-7780-9851-f1d52db36d53",
  type: "page-type/movie",
  slug: "crashing-through-the-snow",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "840372",
      externalLink: "https://www.themoviedb.org/movie/840372",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Crashing Through the Snow",
  genres: ["TV Movie", "Comedy", "Family", "Romance"],
  imdbId: "tt14809392",
  posterPath: "/4biEo7gMRiDP50efRtc8Hft6zys.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
