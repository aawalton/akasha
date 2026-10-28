import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const liesBetweenFriends = {
  id: "01a17499-470d-77ad-a6e7-17e30dbb3cb7",
  type: "page-type/movie",
  slug: "lies-between-friends",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2010-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "101318",
      externalLink: "https://www.themoviedb.org/movie/101318",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lies Between Friends",
  genres: ["Drama", "Mystery", "TV Movie"],
  imdbId: "tt1564005",
  posterPath: "/eNokZ0GZqrJzjqPXbyAYOgAouJk.jpg",
  voteAverage: 4.7,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/howdy",
    "streaming-service/shout-factory-tv",
    "streaming-service/the-cw",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
