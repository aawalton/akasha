import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jlFamilyRanch = {
  id: "01a17499-a7d5-787d-9258-e2510bd1adac",
  type: "page-type/movie",
  slug: "jl-family-ranch",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/jl-family-ranch"],
  position: 1,
  publishedAt: "2016-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "412540",
      externalLink: "https://www.themoviedb.org/movie/412540",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/JL_Ranch" },
  ],
  title: "JL Family Ranch",
  genres: ["Drama", "Western"],
  imdbId: "tt5321174",
  posterPath: "/T9mRvjX4ALjGPlgamxsMHlI7HO.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T20:45:04.980Z",
} as const satisfies Movie
