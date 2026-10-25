import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGrandpaForChristmas = {
  id: "01a17497-3824-75fa-846c-2fb725813e2e",
  type: "page-type/movie",
  slug: "a-grandpa-for-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2007-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "72140",
      externalLink: "https://www.themoviedb.org/movie/72140",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Grandpa_for_Christmas" },
  ],
  title: "A Grandpa for Christmas",
  genres: ["Drama", "TV Movie", "Comedy"],
  imdbId: "tt0950740",
  posterPath: "/cc3TfpWlulbEfq8NJX2z5YI06rm.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
