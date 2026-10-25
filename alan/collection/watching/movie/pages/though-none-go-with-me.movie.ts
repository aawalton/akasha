import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thoughNoneGoWithMe = {
  id: "01a17497-382b-77af-ae8c-e74ad8a8382c",
  type: "page-type/movie",
  slug: "though-none-go-with-me",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "57478",
      externalLink: "https://www.themoviedb.org/movie/57478",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Though_None_Go_with_Me" },
  ],
  title: "Though None Go with Me",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0499580",
  posterPath: "/iKTE5nUcVdtNbFQyupEpD2acX3S.jpg",
  voteAverage: 7.2,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
