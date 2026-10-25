import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCastleOfOurOwn = {
  id: "01a1749a-c867-7496-a06a-5c9d4fd881b0",
  type: "page-type/movie",
  slug: "a-castle-of-our-own",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-06-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1686834",
      externalLink: "https://www.themoviedb.org/movie/1686834",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Castle of Our Own",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt42278577",
  posterPath: "/mW0iFbX9JFhR8yMd8Wnu9t5cpZn.jpg",
  voteAverage: 7,
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
