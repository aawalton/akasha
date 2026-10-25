import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayCrashers = {
  id: "01a1749a-89a9-77d6-a5e9-cd0c29941603",
  type: "page-type/movie",
  slug: "holiday-crashers",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1358987",
      externalLink: "https://www.themoviedb.org/movie/1358987",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Crashers",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt32011999",
  posterPath: "/hcWk9ttwj4zXD0QduTkm377cToq.jpg",
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
