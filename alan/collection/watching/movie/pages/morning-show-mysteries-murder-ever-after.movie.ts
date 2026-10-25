import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const morningShowMysteriesMurderEverAfter = {
  id: "01a1749a-464c-789b-a815-d9a2e719f284",
  type: "page-type/movie",
  slug: "morning-show-mysteries-murder-ever-after",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/morning-show-mysteries"],
  position: 6,
  publishedAt: "2021-05-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "799363",
      externalLink: "https://www.themoviedb.org/movie/799363",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mysteries: Murder Ever After",
  genres: ["Mystery", "Crime", "TV Movie"],
  imdbId: "tt14376566",
  posterPath: "/2neg66DNaIfPXMR9viHktjXZa8K.jpg",
  voteAverage: 6.857,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
