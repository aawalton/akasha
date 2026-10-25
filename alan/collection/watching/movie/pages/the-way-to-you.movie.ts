import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWayToYou = {
  id: "01a1749a-c86b-74bc-9170-6e49d744c8b3",
  type: "page-type/movie",
  slug: "the-way-to-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1608615",
      externalLink: "https://www.themoviedb.org/movie/1608615",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Way to You",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt39300766",
  posterPath: "/4aOxnMaDkr792WOZFJUb6LxcR74.jpg",
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
