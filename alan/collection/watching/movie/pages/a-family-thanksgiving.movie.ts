import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aFamilyThanksgiving = {
  id: "01a17499-470a-79d9-bbc6-b62ae29d39fa",
  type: "page-type/movie",
  slug: "a-family-thanksgiving",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "99079",
      externalLink: "https://www.themoviedb.org/movie/99079",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Family_Thanksgiving" },
  ],
  title: "A Family Thanksgiving",
  genres: ["Fantasy", "TV Movie", "Comedy"],
  imdbId: "tt1738342",
  posterPath: "/oJuvivZWDo3FubvDQrl9Hbwsh3S.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
