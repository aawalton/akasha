import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasCarousel = {
  id: "01a1749a-2597-74ae-b898-00a4197d1ab4",
  type: "page-type/movie",
  slug: "a-christmas-carousel",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746061",
      externalLink: "https://www.themoviedb.org/movie/746061",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Carousel",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13273744",
  posterPath: "/1oqqPncrRREzk5D63YUL9CLbqVf.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
