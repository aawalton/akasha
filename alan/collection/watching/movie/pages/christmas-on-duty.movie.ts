import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasOnDuty = {
  id: "01a1749a-a949-797c-abba-c25e1a341a32",
  type: "page-type/movie",
  slug: "christmas-on-duty",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547885",
      externalLink: "https://www.themoviedb.org/movie/1547885",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas on Duty",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt37133902",
  posterPath: "/cFmKCYpJGf4vgBxvvPFABnGG1DS.jpg",
  voteAverage: 6,
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
