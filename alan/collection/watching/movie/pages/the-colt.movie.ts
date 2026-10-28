import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theColt = {
  id: "01a17497-382a-72a3-bd8e-805ad4b783ff",
  type: "page-type/movie",
  slug: "the-colt",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14973",
      externalLink: "https://www.themoviedb.org/movie/14973",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Colt_(film)" },
  ],
  title: "The Colt",
  genres: ["Drama", "War", "Family", "History", "TV Movie", "Western"],
  imdbId: "tt0416654",
  posterPath: "/20KiYhkbXGsP5lb1EMGXt8ST178.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "streaming-service/plex",
    "streaming-service/shout-factory-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/up-faith-and-family",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
