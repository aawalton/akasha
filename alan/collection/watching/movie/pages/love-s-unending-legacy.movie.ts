import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSUnendingLegacy = {
  id: "01a17497-3827-7ac9-a70e-eec94ddbdb00",
  type: "page-type/movie",
  slug: "love-s-unending-legacy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "30975",
      externalLink: "https://www.themoviedb.org/movie/30975",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love's_Unending_Legacy" },
  ],
  title: "Love's Unending Legacy",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt0929864",
  posterPath: "/xi57bQTg33RpduDphkvtdWkEI7b.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
