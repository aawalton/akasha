import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const monsterMakers = {
  id: "01a17497-3829-7256-8b79-6c1b839190e4",
  type: "page-type/movie",
  slug: "monster-makers",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "128791",
      externalLink: "https://www.themoviedb.org/movie/128791",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Monster Makers",
  genres: ["Family", "Fantasy", "Science Fiction", "Horror"],
  imdbId: "tt0363827",
  posterPath: "/paRJHrAXAJsDXe6uY33aD80zhE.jpg",
  voteAverage: 4,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
