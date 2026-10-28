import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allOfMyHeart = {
  id: "01a17499-8943-724c-9972-d80605232da1",
  type: "page-type/movie",
  slug: "all-of-my-heart",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["franchise/all-of-my-heart"],
  position: 1,
  publishedAt: "2015-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317121",
      externalLink: "https://www.themoviedb.org/movie/317121",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All of My Heart",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt4460176",
  posterPath: "/nCAvpheAApLv9LtvMW0tjywkz6B.jpg",
  voteAverage: 6.876,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
