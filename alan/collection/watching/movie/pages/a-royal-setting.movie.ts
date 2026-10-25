import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalSetting = {
  id: "01a1749a-c867-770c-91e0-2fc36baf2935",
  type: "page-type/movie",
  slug: "a-royal-setting",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1628524",
      externalLink: "https://www.themoviedb.org/movie/1628524",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Setting",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt39601861",
  posterPath: "/hyjbxAfB9XlFogKM7BENqdNMa77.jpg",
  voteAverage: 4.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
