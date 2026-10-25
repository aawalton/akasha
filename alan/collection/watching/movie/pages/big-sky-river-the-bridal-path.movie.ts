import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bigSkyRiverTheBridalPath = {
  id: "01a1749a-89a7-7115-a88a-75bd8249542c",
  type: "page-type/movie",
  slug: "big-sky-river-the-bridal-path",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/big-sky-river"],
  position: 1,
  publishedAt: "2023-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146916",
      externalLink: "https://www.themoviedb.org/movie/1146916",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Big Sky River: The Bridal Path",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt28493537",
  posterPath: "/frKhWX7Dd1VmB82uuePhGbQCvdK.jpg",
  voteAverage: 7.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
