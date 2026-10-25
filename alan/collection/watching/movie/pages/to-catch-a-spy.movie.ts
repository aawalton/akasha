import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toCatchASpy = {
  id: "01a1749a-464e-7d4e-acf6-3a79cc6c3add",
  type: "page-type/movie",
  slug: "to-catch-a-spy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "821807",
      externalLink: "https://www.themoviedb.org/movie/821807",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Catch a Spy",
  genres: ["Mystery", "TV Movie", "Romance"],
  imdbId: "tt14500264",
  posterPath: "/pnpIHLdsDzIfU3KvFJDK6hxX47J.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
