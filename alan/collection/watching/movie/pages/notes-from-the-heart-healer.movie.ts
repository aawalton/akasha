import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const notesFromTheHeartHealer = {
  id: "01a17499-66a0-7e8d-932b-f3f8547e8c86",
  type: "page-type/movie",
  slug: "notes-from-the-heart-healer",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/the-note"],
  position: 2,
  publishedAt: "2012-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "105449",
      externalLink: "https://www.themoviedb.org/movie/105449",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Notes from the Heart Healer",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt2321445",
  posterPath: "/fRKScoH0tja4aQaNUszol9EbaXA.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
