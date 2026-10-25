import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAtFirstGlance = {
  id: "01a17499-a7d5-7682-9e51-90073c7ca9b2",
  type: "page-type/movie",
  slug: "love-at-first-glance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "437667",
      externalLink: "https://www.themoviedb.org/movie/437667",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love at First Glance",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt6338374",
  posterPath: "/q6IbL3Teve159BSGDaUsZ2HNoBn.jpg",
  voteAverage: 5.742,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
