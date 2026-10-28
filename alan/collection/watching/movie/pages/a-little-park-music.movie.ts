import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aLittleParkMusic = {
  id: "01a1749a-c867-7f18-b0b1-74ab97be1922",
  type: "page-type/movie",
  slug: "a-little-park-music",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1645237",
      externalLink: "https://www.themoviedb.org/movie/1645237",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Little Park Music",
  genres: ["Romance"],
  imdbId: "tt40336496",
  posterPath: "/pqjaqj38NSRi0P3SvhG0lclDuFL.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
