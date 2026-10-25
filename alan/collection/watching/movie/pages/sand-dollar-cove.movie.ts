import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sandDollarCove = {
  id: "01a1749a-259d-7fe0-8d10-90af53333043",
  type: "page-type/movie",
  slug: "sand-dollar-cove",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "809137",
      externalLink: "https://www.themoviedb.org/movie/809137",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sand Dollar Cove",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt14549712",
  posterPath: "/78yiGIkeDzHk4g23Kj60HbYrAYP.jpg",
  voteAverage: 6.78,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
