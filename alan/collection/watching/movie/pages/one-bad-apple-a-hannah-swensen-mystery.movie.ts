import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneBadAppleAHannahSwensenMystery = {
  id: "01a1749a-a94c-7d74-b7a2-d8d7b41c60cf",
  type: "page-type/movie",
  slug: "one-bad-apple-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 8,
  publishedAt: "2024-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1248298",
      externalLink: "https://www.themoviedb.org/movie/1248298",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Bad Apple: A Hannah Swensen Mystery",
  genres: ["Mystery", "Drama"],
  imdbId: "tt31202585",
  posterPath: "/cJcWag9R2KJt0LNumv2rs24u9Mo.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
