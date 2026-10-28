import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInLove = {
  id: "01a17499-c95b-7a17-a398-be073ff5c184",
  type: "page-type/movie",
  slug: "christmas-in-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550020",
      externalLink: "https://www.themoviedb.org/movie/550020",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Love",
  genres: ["TV Movie", "Romance", "Family", "Comedy"],
  imdbId: "tt9033712",
  posterPath: "/iDK96L8yN092QuRbfVqFUmT2FnS.jpg",
  voteAverage: 5.957,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
