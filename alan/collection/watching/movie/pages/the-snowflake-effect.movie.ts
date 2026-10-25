import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSnowflakeEffect = {
  id: "01a1749a-c86b-718c-9386-c1695c83f1bb",
  type: "page-type/movie",
  slug: "the-snowflake-effect",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773286",
      externalLink: "https://www.themoviedb.org/movie/1773286",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Snowflake Effect",
  genres: ["Romance"],
  imdbId: "tt46076619",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
