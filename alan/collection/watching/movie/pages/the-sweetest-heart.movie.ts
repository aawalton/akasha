import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSweetestHeart = {
  id: "01a17499-c960-72e9-a3d8-4e583b87ef9b",
  type: "page-type/movie",
  slug: "the-sweetest-heart",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "511022",
      externalLink: "https://www.themoviedb.org/movie/511022",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Sweetest Heart",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8115218",
  posterPath: "/b6uhUULUbh1zqRYnjDakseUjRsM.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
    "streaming-service/vix",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
