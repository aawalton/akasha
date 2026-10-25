import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const battleOfTheBulbs = {
  id: "01a17499-470b-7331-931f-3fd122c7d2b4",
  type: "page-type/movie",
  slug: "battle-of-the-bulbs",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "150308",
      externalLink: "https://www.themoviedb.org/movie/150308",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Battle of the Bulbs",
  genres: ["Drama", "Comedy", "TV Movie"],
  imdbId: "tt1721625",
  posterPath: "/fRED3K5dp5uZGfu97pcxVy6LBjy.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
