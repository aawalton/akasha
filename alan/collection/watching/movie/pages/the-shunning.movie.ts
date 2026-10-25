import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theShunning = {
  id: "01a17499-470f-7e2c-b7cc-cefce53b51a9",
  type: "page-type/movie",
  slug: "the-shunning",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "74549",
      externalLink: "https://www.themoviedb.org/movie/74549",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Shunning",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1561770",
  posterPath: "/uOfs0GtPUbuhI1s5uzJN6I94OHv.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Plex",
    "Plex Channel",
    "Runtime",
    "The Roku Channel",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
