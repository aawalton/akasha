import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtCastleHart = {
  id: "01a1749a-2599-7204-ab32-a43e2bbe4d0a",
  type: "page-type/movie",
  slug: "christmas-at-castle-hart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874166",
      externalLink: "https://www.themoviedb.org/movie/874166",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Castle Hart",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15943556",
  posterPath: "/vgDcBPhEOTvAd7BrmuoRc9jduib.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
