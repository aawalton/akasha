import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideFallenIdol = {
  id: "01a17497-3828-7d23-8f35-65996189a9d7",
  type: "page-type/movie",
  slug: "mcbride-fallen-idol",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 7,
  publishedAt: "2006-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "133353",
      externalLink: "https://www.themoviedb.org/movie/133353",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Fallen Idol",
  genres: ["Mystery", "Drama", "Crime", "Thriller"],
  imdbId: "tt0492894",
  posterPath: "/hFH3U0xnleUXDyuArSinP8uK33Y.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
