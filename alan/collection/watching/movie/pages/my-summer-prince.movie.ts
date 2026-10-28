import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mySummerPrince = {
  id: "01a17499-a7d7-7126-9181-c3eeb0549e70",
  type: "page-type/movie",
  slug: "my-summer-prince",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "407334",
      externalLink: "https://www.themoviedb.org/movie/407334",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Summer Prince",
  genres: ["Romance", "Comedy", "Family", "TV Movie"],
  imdbId: "tt5828874",
  posterPath: "/tPBNr3T8kxRZJJ9SL9TpbZCuzqk.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
