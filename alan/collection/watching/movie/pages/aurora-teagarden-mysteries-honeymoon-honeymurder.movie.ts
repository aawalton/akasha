import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesHoneymoonHoneymurder = {
  id: "01a1749a-4649-737b-9750-448d6ed42ccb",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-honeymoon-honeymurder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 16,
  publishedAt: "2021-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "845929",
      externalLink: "https://www.themoviedb.org/movie/845929",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: Honeymoon, Honeymurder",
  genres: ["Mystery", "TV Movie", "Drama", "Crime"],
  imdbId: "tt14147550",
  posterPath: "/gf9PUXMEXJ9tebdtGnmnb8pf9uD.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
