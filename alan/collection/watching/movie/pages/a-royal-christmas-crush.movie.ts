import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalChristmasCrush = {
  id: "01a1749a-66bb-7a02-97c7-f8a9430fed98",
  type: "page-type/movie",
  slug: "a-royal-christmas-crush",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-07-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132366",
      externalLink: "https://www.themoviedb.org/movie/1132366",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Christmas Crush",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28077855",
  posterPath: "/znk6frNlEd90QATu40qsh997KvU.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
