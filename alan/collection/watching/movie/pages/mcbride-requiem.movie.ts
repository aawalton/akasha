import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideRequiem = {
  id: "01a17497-3828-7e7b-87b5-c8a96e62775c",
  type: "page-type/movie",
  slug: "mcbride-requiem",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 8,
  publishedAt: "2006-05-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "215586",
      externalLink: "https://www.themoviedb.org/movie/215586",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Requiem",
  genres: ["Crime", "Mystery", "Drama"],
  imdbId: "tt0816576",
  posterPath: "/966bO6ryonAiZ8jltRWYakvbYVF.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
