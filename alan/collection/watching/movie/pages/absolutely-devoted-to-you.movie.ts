import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const absolutelyDevotedToYou = {
  id: "01a1749a-c868-7b66-bfb9-f96da330ef31",
  type: "page-type/movie",
  slug: "absolutely-devoted-to-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1725033",
      externalLink: "https://www.themoviedb.org/movie/1725033",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Absolutely Devoted to You",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt43639027",
  posterPath: "/2PxEk5ncxI5lbfqVyV6x3ED4YQV.jpg",
  voteAverage: 8.3,
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
