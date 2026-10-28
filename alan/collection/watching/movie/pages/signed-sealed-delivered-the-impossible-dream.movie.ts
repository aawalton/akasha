import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredTheImpossibleDream = {
  id: "01a17499-8948-7729-9928-240d778bce5b",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-the-impossible-dream",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 6,
  publishedAt: "2015-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "361261",
      externalLink: "https://www.themoviedb.org/movie/361261",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: The Impossible Dream",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt5084214",
  posterPath: "/lXRQfIuDRSc4zcYfwnJPbjVFGji.jpg",
  voteAverage: 7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
