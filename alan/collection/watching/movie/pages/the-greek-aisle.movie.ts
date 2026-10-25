import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGreekAisle = {
  id: "01a1749a-c86b-70da-acd3-bb355d3519fb",
  type: "page-type/movie",
  slug: "the-greek-aisle",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-06-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1686823",
      externalLink: "https://www.themoviedb.org/movie/1686823",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Greek Aisle",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt42277791",
  posterPath: "/fPJXkiAoW07NUGd9GSb93JKeI71.jpg",
  voteAverage: 8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
