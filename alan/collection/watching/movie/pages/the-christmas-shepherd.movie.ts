import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasShepherd = {
  id: "01a17499-8949-7be1-9c18-1aaaa72470cd",
  type: "page-type/movie",
  slug: "the-christmas-shepherd",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299583",
      externalLink: "https://www.themoviedb.org/movie/299583",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Shepherd",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt4222522",
  posterPath: "/8fnt1ReSDl02kqYM5mT1bZGMTqB.jpg",
  voteAverage: 5.986,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
