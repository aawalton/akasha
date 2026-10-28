import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const summerInTheCity = {
  id: "01a17499-a7d7-7739-a6dd-5ce590a6b620",
  type: "page-type/movie",
  slug: "summer-in-the-city",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "407335",
      externalLink: "https://www.themoviedb.org/movie/407335",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Summer In the City",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt5734214",
  posterPath: "/srAEQJakSy3o5NmB52lO6WFDBJG.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
