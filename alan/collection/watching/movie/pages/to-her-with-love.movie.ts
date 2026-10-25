import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toHerWithLove = {
  id: "01a1749a-66c1-70dd-affe-cb4941c105b6",
  type: "page-type/movie",
  slug: "to-her-with-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1006265",
      externalLink: "https://www.themoviedb.org/movie/1006265",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Her, With Love",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt21617152",
  posterPath: "/qALK7N770iCHLy6CCyYeOj1dXQU.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
