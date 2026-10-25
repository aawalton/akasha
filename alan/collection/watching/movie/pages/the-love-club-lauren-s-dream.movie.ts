import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLoveClubLaurenSDream = {
  id: "01a1749a-89ab-7f92-adf8-dc97ea59b275",
  type: "page-type/movie",
  slug: "the-love-club-lauren-s-dream",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/the-love-club"],
  position: 3,
  publishedAt: "2023-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1084026",
      externalLink: "https://www.themoviedb.org/movie/1084026",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Love Club: Lauren's Dream",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21214480",
  posterPath: "/A3jijvmqnh6uahR7vYe5nA2hbDh.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T20:45:25.537Z",
} as const satisfies Movie
