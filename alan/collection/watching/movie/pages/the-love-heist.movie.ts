import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLoveHeist = {
  id: "01a1749a-c86b-78e0-9fc8-ae4affb944be",
  type: "page-type/movie",
  slug: "the-love-heist",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1686875",
      externalLink: "https://www.themoviedb.org/movie/1686875",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Love Heist",
  genres: ["Romance"],
  imdbId: "tt42278042",
  posterPath: "/upix8bo5uJ5NUamttLvqUZDwzQE.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
