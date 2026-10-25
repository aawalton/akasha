import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const straightFromTheHeart = {
  id: "01a17497-195d-783a-ab0d-9f4cd28b87d8",
  type: "page-type/movie",
  slug: "straight-from-the-heart",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "26131",
      externalLink: "https://www.themoviedb.org/movie/26131",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Straight_from_the_Heart_(2003_film)",
    },
  ],
  title: "Straight from the Heart",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt0340380",
  posterPath: "/9bDM5O87EbABkYEjV6VmSDXVCYT.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
