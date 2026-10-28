import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const emmaFieldingMysteriesMoreBitterThanDeath = {
  id: "01a1749a-06bb-7c1f-b1e8-291eba6c64e9",
  type: "page-type/movie",
  slug: "emma-fielding-mysteries-more-bitter-than-death",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/emma-fielding-mystery"],
  position: 3,
  publishedAt: "2019-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "581474",
      externalLink: "https://www.themoviedb.org/movie/581474",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Emma Fielding Mysteries: More Bitter than Death",
  genres: ["Mystery", "TV Movie", "Crime"],
  imdbId: "tt9794314",
  posterPath: "/sujHVqm2S7sGlsSiyrcx0TXuOfq.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
