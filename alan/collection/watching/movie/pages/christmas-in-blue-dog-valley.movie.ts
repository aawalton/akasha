import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInBlueDogValley = {
  id: "01a1749a-c868-7a0d-a867-e856c44c747c",
  type: "page-type/movie",
  slug: "christmas-in-blue-dog-valley",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773330",
      externalLink: "https://www.themoviedb.org/movie/1773330",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Blue Dog Valley",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt46076055",
  posterPath: "/zlS8mSS7oXDBdfICfOI3bTavvjw.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
