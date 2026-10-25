import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theReadingRoom = {
  id: "01a17497-382b-7d64-9f90-4227413d5770",
  type: "page-type/movie",
  slug: "the-reading-room",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "47516",
      externalLink: "https://www.themoviedb.org/movie/47516",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Reading_Room_(film)" },
  ],
  title: "The Reading Room",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt0446769",
  posterPath: "/qrlz87co0Snj7dam8crlZLngTGJ.jpg",
  voteAverage: 7.5,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
