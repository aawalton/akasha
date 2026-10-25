import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lostInParadise = {
  id: "01a1749a-c869-79db-9471-113627f6fbb5",
  type: "page-type/movie",
  slug: "lost-in-paradise",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1592021",
      externalLink: "https://www.themoviedb.org/movie/1592021",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lost in Paradise",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt39095566",
  posterPath: "/2wOmjscD10xSeZ1d7LgFiBGcSvt.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
