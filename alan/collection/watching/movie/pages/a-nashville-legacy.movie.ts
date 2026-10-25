import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNashvilleLegacy = {
  id: "01a1749a-89a6-74a0-8b87-41aff804fd85",
  type: "page-type/movie",
  slug: "a-nashville-legacy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1070374",
      externalLink: "https://www.themoviedb.org/movie/1070374",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Nashville Legacy",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt25391134",
  posterPath: "/dj8H6rFAXPxhCZVEU2VItW1r3Hf.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
