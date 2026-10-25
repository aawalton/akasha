import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSeasonToBlossom = {
  id: "01a1749a-c868-7110-86a3-42a26dad549a",
  type: "page-type/movie",
  slug: "a-season-to-blossom",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1638782",
      externalLink: "https://www.themoviedb.org/movie/1638782",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Season to Blossom",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt40017372",
  posterPath: "/7DP7lulYcuMtUFc7AbmnqJBdtw1.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
