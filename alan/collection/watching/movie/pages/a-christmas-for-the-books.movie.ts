import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasForTheBooks = {
  id: "01a17499-e800-7ad8-945b-a122d68783d1",
  type: "page-type/movie",
  slug: "a-christmas-for-the-books",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "565599",
      externalLink: "https://www.themoviedb.org/movie/565599",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas for the Books",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8395220",
  posterPath: "/xIznkA1EzVIgWBmZTQid2kf0CEN.jpg",
  voteAverage: 5.3,
  streamingOn: ["Plex", "Plex Channel"],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
