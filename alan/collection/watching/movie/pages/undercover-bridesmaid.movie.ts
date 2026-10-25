import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const undercoverBridesmaid = {
  id: "01a17499-66a3-7df7-aad0-dffa26f8d4b7",
  type: "page-type/movie",
  slug: "undercover-bridesmaid",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "153133",
      externalLink: "https://www.themoviedb.org/movie/153133",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Undercover Bridesmaid",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt2094787",
  posterPath: "/wGtJYQZiXI9gP06BeeapvOsK4y4.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
