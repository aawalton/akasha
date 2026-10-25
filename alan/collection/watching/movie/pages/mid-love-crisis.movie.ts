import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const midLoveCrisis = {
  id: "01a1749a-66bf-7ac6-b5f8-f78328d213af",
  type: "page-type/movie",
  slug: "mid-love-crisis",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1020534",
      externalLink: "https://www.themoviedb.org/movie/1020534",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mid-Love Crisis",
  genres: ["TV Movie", "Romance", "Comedy", "Drama"],
  imdbId: "tt21932636",
  posterPath: "/ApfspCJDB49b39D5zzs9TVsqeWU.jpg",
  voteAverage: 4.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
