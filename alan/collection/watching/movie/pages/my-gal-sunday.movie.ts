import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myGalSunday = {
  id: "01a17499-8947-7b3f-8482-4cb373902307",
  type: "page-type/movie",
  slug: "my-gal-sunday",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2014-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "267283",
      externalLink: "https://www.themoviedb.org/movie/267283",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Gal Sunday",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt3387560",
  posterPath: "/mu5zjXNuG61g8wlLUeso2ggLK3q.jpg",
  voteAverage: 6.4,
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
