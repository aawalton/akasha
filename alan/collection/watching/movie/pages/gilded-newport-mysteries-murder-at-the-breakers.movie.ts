import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gildedNewportMysteriesMurderAtTheBreakers = {
  id: "01a1749a-a94a-72a7-9eeb-9eac29526dbb",
  type: "page-type/movie",
  slug: "gilded-newport-mysteries-murder-at-the-breakers",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2024-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221661",
      externalLink: "https://www.themoviedb.org/movie/1221661",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Gilded Newport Mysteries: Murder at the Breakers",
  genres: ["TV Movie", "Drama", "Mystery"],
  imdbId: "tt30852822",
  posterPath: "/3aC6w6p0CgBdWQy6TI3MIqlZ3zi.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
