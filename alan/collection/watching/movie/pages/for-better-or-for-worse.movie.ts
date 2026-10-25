import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const forBetterOrForWorse = {
  id: "01a17499-8945-761c-804b-ba0609a70b83",
  type: "page-type/movie",
  slug: "for-better-or-for-worse",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-07-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "284166",
      externalLink: "https://www.themoviedb.org/movie/284166",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "For Better or For Worse",
  genres: ["Romance", "Family", "Comedy", "TV Movie"],
  imdbId: "tt3579488",
  posterPath: "/dw4af3Ybdk6e6OdR2EYrmL7bx0q.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
