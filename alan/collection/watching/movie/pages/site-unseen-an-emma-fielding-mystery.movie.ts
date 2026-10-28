import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const siteUnseenAnEmmaFieldingMystery = {
  id: "01a17499-c95f-750f-978a-ddf7c0138c27",
  type: "page-type/movie",
  slug: "site-unseen-an-emma-fielding-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/emma-fielding-mystery"],
  position: 1,
  publishedAt: "2017-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "457470",
      externalLink: "https://www.themoviedb.org/movie/457470",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Site Unseen: An Emma Fielding Mystery",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt6973942",
  posterPath: "/zkPwgc3w4Bf65TNKN0GvtGZjQNL.jpg",
  voteAverage: 6.8,
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
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
