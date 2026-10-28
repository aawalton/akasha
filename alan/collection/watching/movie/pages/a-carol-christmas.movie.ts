import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCarolChristmas = {
  id: "01a17497-3824-78e6-9634-a006f08ba2fc",
  type: "page-type/movie",
  slug: "a-carol-christmas",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2003-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "72853",
      externalLink: "https://www.themoviedb.org/movie/72853",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Carol_Christmas" },
  ],
  title: "A Carol Christmas",
  genres: ["Family", "Fantasy", "Comedy", "TV Movie"],
  imdbId: "tt0381942",
  posterPath: "/uhK2RkSV67DM0hfFEzCXAd4s4Bu.jpg",
  voteAverage: 5.8,
  streamingOn: ["streaming-service/up-faith-and-family"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
