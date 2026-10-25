import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const neverKissAManInAChristmasSweater = {
  id: "01a1749a-06be-73f4-bc6b-bdac36b4ed72",
  type: "page-type/movie",
  slug: "never-kiss-a-man-in-a-christmas-sweater",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746034",
      externalLink: "https://www.themoviedb.org/movie/746034",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Never Kiss a Man in a Christmas Sweater",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt13192538",
  posterPath: "/7VyM9eU0MoP4KA81meqt7UJoZAP.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
