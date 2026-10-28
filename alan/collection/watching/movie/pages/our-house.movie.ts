import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourHouse = {
  id: "01a17497-382a-72f4-801d-605839c0d1a6",
  type: "page-type/movie",
  slug: "our-house",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "461447",
      externalLink: "https://www.themoviedb.org/movie/461447",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Our_House_(2006_film)" },
  ],
  title: "Our House",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0473376",
  posterPath: "/a5QbbQxWdJssIu1PPFcgh8XBw9b.jpg",
  voteAverage: 6.4,
  streamingOn: ["streaming-service/xumo-play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
