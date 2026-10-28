import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jlFamilyRanchTheWeddingGift = {
  id: "01a1749a-259b-7395-8e95-20fefa126296",
  type: "page-type/movie",
  slug: "jl-family-ranch-the-wedding-gift",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/jl-family-ranch"],
  position: 2,
  publishedAt: "2020-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "689927",
      externalLink: "https://www.themoviedb.org/movie/689927",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "JL Family Ranch: The Wedding Gift",
  genres: ["TV Movie", "Family"],
  imdbId: "tt10302982",
  posterPath: "/CMUAwaNAnLEyployKEH16GBLU4.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
