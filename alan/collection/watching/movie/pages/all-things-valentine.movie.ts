import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allThingsValentine = {
  id: "01a17499-a7d3-7810-8b5c-0c354815cf54",
  type: "page-type/movie",
  slug: "all-things-valentine",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "377428",
      externalLink: "https://www.themoviedb.org/movie/377428",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All Things Valentine",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt5329524",
  posterPath: "/2iU19KivcXMk27837pwsVv6wcTj.jpg",
  voteAverage: 5.9,
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
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
