import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const perfectHarmony = {
  id: "01a1749a-66c0-7451-9057-72b2b006de02",
  type: "page-type/movie",
  slug: "perfect-harmony",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1020541",
      externalLink: "https://www.themoviedb.org/movie/1020541",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Perfect Harmony",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21858442",
  posterPath: "/1m0TwSdbPPOrlaAxSH9frEyogmS.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
