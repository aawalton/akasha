import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murder101TheLockedRoomMystery = {
  id: "01a17499-470e-755a-ab60-8c06f67b6207",
  type: "page-type/movie",
  slug: "murder-101-the-locked-room-mystery",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/murder-101"],
  position: 3,
  publishedAt: "2008-08-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "354463",
      externalLink: "https://www.themoviedb.org/movie/354463",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder 101: The Locked Room Mystery",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt1166108",
  posterPath: "/y3lArHF4fR43SrYVgOqcAdMcHPb.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
