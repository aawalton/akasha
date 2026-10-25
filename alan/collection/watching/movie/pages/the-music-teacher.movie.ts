import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMusicTeacher = {
  id: "01a17499-66a2-7cc3-8907-479405947ca8",
  type: "page-type/movie",
  slug: "the-music-teacher",
  ownLength: 111,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "122280",
      externalLink: "https://www.themoviedb.org/movie/122280",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Music Teacher",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt2317233",
  posterPath: "/A3O5TMw1tePf4EPqMmh6xQmGPHj.jpg",
  voteAverage: 5,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
