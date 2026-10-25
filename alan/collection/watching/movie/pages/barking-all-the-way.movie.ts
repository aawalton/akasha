import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const barkingAllTheWay = {
  id: "01a1749a-c868-7340-ae4c-f0e9ec401421",
  type: "page-type/movie",
  slug: "barking-all-the-way",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773266",
      externalLink: "https://www.themoviedb.org/movie/1773266",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Barking All the Way",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt46076921",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
