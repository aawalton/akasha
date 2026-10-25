import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesAGameOfCatAndMouse = {
  id: "01a1749a-06ba-7ede-99c1-9ae0cc38dd02",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-a-game-of-cat-and-mouse",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 10,
  publishedAt: "2019-08-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "590118",
      externalLink: "https://www.themoviedb.org/movie/590118",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: A Game of Cat and Mouse",
  genres: ["Mystery", "TV Movie", "Crime"],
  imdbId: "tt9759864",
  posterPath: "/pb15uoxtqbK8JdSPbjEx1K0KPA7.jpg",
  voteAverage: 7.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
