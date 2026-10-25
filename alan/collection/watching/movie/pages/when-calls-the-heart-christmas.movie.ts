import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenCallsTheHeartChristmas = {
  id: "01a17499-a7d9-7c55-a164-35b620039fc9",
  type: "page-type/movie",
  slug: "when-calls-the-heart-christmas",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/when-calls-the-heart"],
  position: 3,
  publishedAt: "2016-12-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383642",
      externalLink: "https://www.themoviedb.org/movie/1383642",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "When Calls the Heart Christmas",
  genres: ["Drama", "History", "Romance"],
  imdbId: "tt6028688",
  posterPath: "/r4aIq5MgLDmtLQPkcASVb29RwcV.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
