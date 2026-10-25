import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAlwaysSanta = {
  id: "01a17499-a7d5-74ac-8b10-e16b2d6ac6f9",
  type: "page-type/movie",
  slug: "love-always-santa",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421629",
      externalLink: "https://www.themoviedb.org/movie/421629",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love_Always,_Santa" },
  ],
  title: "Love Always, Santa",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt6085974",
  posterPath: "/5RXu0jaDXzxzqjtVDYLW5BbGuiA.jpg",
  voteAverage: 5.8,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
