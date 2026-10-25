import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aLittleChristmasCharm = {
  id: "01a1749a-2598-7de5-8a24-fec532f6dd02",
  type: "page-type/movie",
  slug: "a-little-christmas-charm",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746463",
      externalLink: "https://www.themoviedb.org/movie/746463",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Little Christmas Charm",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10516322",
  posterPath: "/jt1wNBJ4RffAH46RmduatD3OUML.jpg",
  voteAverage: 6.9,
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
