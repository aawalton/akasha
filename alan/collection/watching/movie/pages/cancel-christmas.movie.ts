import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cancelChristmas = {
  id: "01a17499-669d-7081-a815-7f1a19b4942f",
  type: "page-type/movie",
  slug: "cancel-christmas",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "144712",
      externalLink: "https://www.themoviedb.org/movie/144712",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cancel Christmas",
  genres: ["Family", "Fantasy", "TV Movie"],
  imdbId: "tt1733111",
  posterPath: "/6WRHmmxJNYrcWULmHnLtuZPgdgD.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
