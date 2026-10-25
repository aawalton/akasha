import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const matchmakerSanta = {
  id: "01a17499-66a0-79ac-a0a4-051501f1f249",
  type: "page-type/movie",
  slug: "matchmaker-santa",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "144785",
      externalLink: "https://www.themoviedb.org/movie/144785",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Matchmaker Santa",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt2400685",
  posterPath: "/rFZa0qzBRpyBJDHesv8oZhz2ut9.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
