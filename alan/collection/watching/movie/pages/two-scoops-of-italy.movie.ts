import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twoScoopsOfItaly = {
  id: "01a1749a-89ac-753b-80a1-98bb023d7122",
  type: "page-type/movie",
  slug: "two-scoops-of-italy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-06-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1285270",
      externalLink: "https://www.themoviedb.org/movie/1285270",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Two Scoops of Italy",
  genres: ["Romance", "Drama"],
  imdbId: "tt32422182",
  posterPath: "/bNusIXksXCMYize9ldIeBOZORcY.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
