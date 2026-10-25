import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const justOneKiss = {
  id: "01a1749a-464b-798a-9054-d3bd4fca8ed6",
  type: "page-type/movie",
  slug: "just-one-kiss",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "944941",
      externalLink: "https://www.themoviedb.org/movie/944941",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Just One Kiss",
  genres: ["Romance", "Comedy", "TV Movie", "Drama"],
  imdbId: "tt12876668",
  posterPath: "/6Ox38838jryMO3yNrNlrN5n27ND.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
