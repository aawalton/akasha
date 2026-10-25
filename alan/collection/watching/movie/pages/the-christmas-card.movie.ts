import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasCard = {
  id: "01a17497-382a-7ad7-9276-8411510f9878",
  type: "page-type/movie",
  slug: "the-christmas-card",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2006-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46526",
      externalLink: "https://www.themoviedb.org/movie/46526",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Card" },
  ],
  title: "The Christmas Card",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt0783494",
  posterPath: "/xmw4hOBdpyzUyDJePhLh8oQTvO.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
