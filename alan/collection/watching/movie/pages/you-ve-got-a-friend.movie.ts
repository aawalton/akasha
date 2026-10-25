import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const youVeGotAFriend = {
  id: "01a17497-382b-7435-8c9f-17b4677ea393",
  type: "page-type/movie",
  slug: "you-ve-got-a-friend",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "259053",
      externalLink: "https://www.themoviedb.org/movie/259053",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "You've Got a Friend",
  genres: ["Family", "TV Movie"],
  imdbId: "tt0995065",
  posterPath: "/aM8QI5PrlwrCbMbT4xzxNyjL8SJ.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
