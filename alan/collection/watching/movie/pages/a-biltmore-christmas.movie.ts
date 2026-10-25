import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBiltmoreChristmas = {
  id: "01a1749a-66bb-753e-939d-735bcd2dfaf6",
  type: "page-type/movie",
  slug: "a-biltmore-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/a-biltmore-christmas"],
  position: 0,
  publishedAt: "2023-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1064137",
      externalLink: "https://www.themoviedb.org/movie/1064137",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Biltmore Christmas",
  genres: ["Romance", "Fantasy", "TV Movie"],
  imdbId: "tt24822574",
  posterPath: "/zwlauOMw8cqRrl8CFbJ0a4KG38i.jpg",
  voteAverage: 6.926,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
