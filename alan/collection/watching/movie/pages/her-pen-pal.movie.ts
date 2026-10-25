import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const herPenPal = {
  id: "01a1749a-259b-7de8-8db3-ea9675b2267f",
  type: "page-type/movie",
  slug: "her-pen-pal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "809340",
      externalLink: "https://www.themoviedb.org/movie/809340",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Her Pen Pal",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt14605426",
  posterPath: "/oz71mRn4UeiE7wr7KV5mUwsncA3.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
