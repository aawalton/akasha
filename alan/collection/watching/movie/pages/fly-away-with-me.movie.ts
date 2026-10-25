import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flyAwayWithMe = {
  id: "01a1749a-464a-736c-85fd-9ab8b2c89886",
  type: "page-type/movie",
  slug: "fly-away-with-me",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1006306",
      externalLink: "https://www.themoviedb.org/movie/1006306",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fly Away With Me",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21616920",
  posterPath: "/xlwyLNzgZ8RPDaXVe2DmT9tUBOC.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
