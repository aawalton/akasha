import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasWish = {
  id: "01a17499-669c-72b2-af8c-88ee4b676947",
  type: "page-type/movie",
  slug: "a-christmas-wish",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "80544",
      externalLink: "https://www.themoviedb.org/movie/80544",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Wish",
  genres: ["TV Movie", "Family", "Drama", "Comedy"],
  imdbId: "tt1577038",
  posterPath: "/vr6j28yj9kfl7TOO3J0BWoaUSEX.jpg",
  voteAverage: 5.9,
  streamingOn: ["Lionsgate+ Amazon Channel", "Plex", "Plex Channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
