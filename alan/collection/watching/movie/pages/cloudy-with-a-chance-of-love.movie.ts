import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cloudyWithAChanceOfLove = {
  id: "01a17499-8944-7faa-8257-707a19058981",
  type: "page-type/movie",
  slug: "cloudy-with-a-chance-of-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317120",
      externalLink: "https://www.themoviedb.org/movie/317120",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cloudy with a Chance of Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt4364338",
  posterPath: "/6hSLIyPZchm7YQzN2xNlvXzoYto.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
