import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whoSComingForChristmas = {
  id: "01a1749a-c86c-7db2-8a57-acdf41a3cea6",
  type: "page-type/movie",
  slug: "who-s-coming-for-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773378",
      externalLink: "https://www.themoviedb.org/movie/1773378",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Who’s Coming for Christmas?",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt46075371",
  posterPath: "/1KIkID5p5smDoR07BjI7mgaV2QQ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
