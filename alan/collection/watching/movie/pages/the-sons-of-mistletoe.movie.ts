import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSonsOfMistletoe = {
  id: "01a17497-195e-70a1-a998-b88b3b45d122",
  type: "page-type/movie",
  slug: "the-sons-of-mistletoe",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2001-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "310797",
      externalLink: "https://www.themoviedb.org/movie/310797",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Sons_of_Mistletoe" },
  ],
  title: "The Sons of Mistletoe",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt0286140",
  posterPath: "/AbT9CM0UqXSvxJK6y87Tp2k848Y.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Pluto TV",
    "The Roku Channel",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
