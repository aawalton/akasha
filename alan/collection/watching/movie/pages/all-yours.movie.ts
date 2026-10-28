import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allYours = {
  id: "01a17499-a7d3-76d2-9a6c-1fe3dd0fd292",
  type: "page-type/movie",
  slug: "all-yours",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "387398",
      externalLink: "https://www.themoviedb.org/movie/387398",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/All_Yours_(2016_film)" },
  ],
  title: "All Yours",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt5368354",
  posterPath: "/uJUxM5S1FTNvs65hFaBUid9BSq7.jpg",
  voteAverage: 5.7,
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
