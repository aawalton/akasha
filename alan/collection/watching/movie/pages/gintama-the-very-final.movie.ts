import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gintamaTheVeryFinal = {
  id: "01a183d6-422d-715b-803e-010bff1e7820",
  type: "page-type/movie",
  slug: "gintama-the-very-final",
  ownLength: 104,
  ownProgress: 0,
  partOfCollections: ["fandom/gintama"],
  publishedAt: "2021-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "732203",
      externalLink: "https://www.themoviedb.org/movie/732203",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Gintama: The Very Final",
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/crunchyroll",
    "streaming-service/fandango-at-home-free",
    "streaming-service/the-roku-channel",
  ],
  createdAt: "2026-10-28T18:46:59.373Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
