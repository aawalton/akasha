import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toastToItaly = {
  id: "01a1749a-c86c-708b-ab57-15111249f1d4",
  type: "page-type/movie",
  slug: "toast-to-italy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1726056",
      externalLink: "https://www.themoviedb.org/movie/1726056",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Toast to Italy",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt43639008",
  posterPath: "/gTQ4Ll4x0TLZhXfALBlvCNcT9sY.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
